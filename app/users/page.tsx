import React from 'react';
import Link from 'next/link';

interface User {
    id: number;
    name: string;
}
export default async function UsersPage() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
        next: {revalidate: 10}
    })
    const users: User[] = await res.json()
    return (
            <main>
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
            </main>
      );
}