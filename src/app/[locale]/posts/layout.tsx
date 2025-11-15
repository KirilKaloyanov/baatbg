import { ReactNode } from 'react';

export default function PostsLayout({ children } : { children: ReactNode }) {
    return (
        <div id="posts" className="container mx-auto">
            {children}
        </div>
    );
}