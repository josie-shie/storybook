import { useEffect, useRef, useCallback } from 'react';

interface InfiniteScrollProps {
    onVisible: () => void; // 定义 onVisible 为没有参数和返回值的函数
    children: React.ReactNode; // children 类型是 React 节点
    rootMargin?: string; // 可选属性，默认为 '0px'
    threshold?: number; // 可选属性，默认为 0.1
}

function InfiniteScroll({
    onVisible,
    children,
    rootMargin = '840px',
    threshold = 0.1
}: InfiniteScrollProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    const handleIntersect = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    onVisible();
                }
            });
        },
        [onVisible]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin,
            threshold
        });

        const currentRef = ref.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [handleIntersect, rootMargin, threshold]);

    return <div ref={ref}>{children}</div>;
}

export { InfiniteScroll };
