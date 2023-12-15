import React, { Suspense } from 'react';
import { Metadata } from 'next'
import Loading from '@/app/components/Loading';

interface User {
    id: number;
    name: string;
    email: string;
}

type Props = {
    params: { id: string }
}

async function getUser(id: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'GET',
        next: {revalidate: 10}
    })
    return await res.json()
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const user: User = await getUser(params.id)
    return {
        title: user.name,
    }
}

export default async function UsersIdPage({ params }: any) {
    const user: User = await getUser(params.id)
    return (
        <main>
            <Suspense fallback={<Loading icon="info" />}>
            <h5>User {user.name} (Where ID: {user.id})</h5>
            <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
            </Suspense>
        </main>
    )
}