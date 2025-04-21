'use client'

import { ExclamationTriangleIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions'
import { useState } from 'react';
import Modal from '../modal';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const [showModal, setShowModal] = useState(false);

  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <>
      <button onClick={() => setShowModal(true)}
        className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
      <Modal
        isOpen={showModal}
        title={<div className="flex items-center gap-2">
          <ExclamationTriangleIcon className="w-8 h-8 text-yellow-600" />
          Eliminar factura
        </div>
        }
        onAccept={deleteInvoiceWithId}
        onCancel={() => setShowModal(false)}
        onClose={() => setShowModal(false)}
      >
        ¿Estás seguro de que quieres eliminar la factura?
      </Modal>
    </>
  );
}
