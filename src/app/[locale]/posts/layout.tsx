import { ReactNode } from 'react';

export default function PostsLayout({ children } : { children: ReactNode }) {
    return (
        <div className="container mx-auto">
            {children}
        </div>
    );
}