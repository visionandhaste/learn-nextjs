import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default function Page(props: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<div>Loading invoice...</div>}>
            <EditInvoice paramsPromise={props.params} />
        </Suspense>
    );
}

async function EditInvoice(props: { paramsPromise: Promise<{ id: string }> }) {
    const params = await props.paramsPromise;
    const id = params.id;
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ]);

    if (!invoice) {
        notFound();
    }

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
                label: 'Edit Invoice',
                href: `/dashboard/invoices/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form invoice={invoice} customers={customers} />
        </main>
    );
}