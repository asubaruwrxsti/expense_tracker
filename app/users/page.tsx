import React, { Suspense } from 'react';
import Link from 'next/link';
import Loading from '../components/Loading';

interface User {
    id: number;
    name: string;
}
export default async function UsersPage() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
        next: { revalidate: 10 }
    })
    const users: User[] = await res.json()
    return (
        <main>
            <Suspense fallback={<Loading icon="info" />}>
                <h1>Users</h1>
                <Link href="/">Home</Link>
                <Link href={`/users/new`}>New User</Link>
                <>
                    {users.map((users) => (
                        <div key={users.id}>
                            <Link href={`/users/${users.id}`}>{users.name}</Link>
                        </div>
                    ))}
                </>
            </Suspense>
        </main>
    );
}