import { ReactNode } from 'react';

export default function ToursLayout({ children } : { children: ReactNode }) {
    return (
        <div className="container mx-auto">
            {children}
        </div>
    );
}