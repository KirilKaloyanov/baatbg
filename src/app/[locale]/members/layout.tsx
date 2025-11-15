import { ReactNode } from 'react';

export default function MembersLayout({ children } : { children: ReactNode }) {
    return (
        <div className="container mx-auto">
            {children}
        </div>
    );
}