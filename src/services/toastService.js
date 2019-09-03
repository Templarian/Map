import { register, ValueChangedEvent } from 'wire-service';
import { getSubject } from './util';

const toasts = [];
const subject = getSubject([], undefined);

export default function getObservable(config) {
    return subject.observable;
}

let uniqueId = 0;

function toast({ message, dismissable = true, seconds = 0, variant = 'default' }) {
    var id = uniqueId++;
    var toast = {
        id,
        message,
        seconds,
        variant,
        dismissable
    };
    toasts.push(toast);
    subject.next(toasts);
    if (seconds) {
        setTimeout(() => {
            removeToast(toast.id)
        }, seconds * 1000);
    }
    return id;
}

export function addToast(message, seconds = 0) {
    return toast({ message, seconds });
}

export function addErrorToast(message, seconds = 0) {
    return toast({ message, seconds, variant: 'error' });
}

export function addWarningToast(message, seconds = 0) {
    return toast({ message, seconds, variant: 'warning' });
}

export function addLoadingToast(message, seconds = 0) {
    return toast({ message, seconds, variant: 'loading', dismissable: false });
}

export function removeToast(id) {
    id = parseInt(id);
    toasts.splice(toasts.findIndex(x => x.id === id), 1);
    subject.next(toasts);
}

export function removeAllToasts() {
    toasts.forEach(toast => {
        removeToast(toast.id);
    })
}

export function getToasts(config) {
    return new Promise((resolve, reject) => {
        const observable = getObservable(config);
        if (!observable) {
            return reject(new Error('Dev: invalid observable'));
        }

        observable.subscribe({
            next: value => resolve(value),
            error: error => reject(error),
            complete: resolve,
        });
    });
}

register(getToasts, function getMapWireAdapter(wiredEventTarget) {
    let subscription;
    let config;

    wiredEventTarget.dispatchEvent(new ValueChangedEvent({ data: undefined, error: undefined }));

    const observer = {
        next: data =>
            wiredEventTarget.dispatchEvent(new ValueChangedEvent({ data, error: undefined })),
        error: error =>
            wiredEventTarget.dispatchEvent(new ValueChangedEvent({ data: undefined, error }))
    };

    wiredEventTarget.addEventListener('connect', () => {
        const observable = getObservable(config);
        if (observable) {
            subscription = observable.subscribe(observer);
        }
    });

    wiredEventTarget.addEventListener('disconnect', () => {
        subscription.unsubscribe();
    });

    wiredEventTarget.addEventListener('config', newConfig => {
        config = newConfig;
        if (subscription) {
            subscription.unsubscribe();
            subscription = undefined;
        }
        const observable = getObservable(config);
        if (observable) {
            subscription = observable.subscribe(observer);
        }
    });
});