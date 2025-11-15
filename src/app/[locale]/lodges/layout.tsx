import { ReactNode } from 'react';

export default function LodgesLayout({ children } : { children: ReactNode }) {
    return (
        <div className="container mx-auto">
            {children}
        </div>
    );
}