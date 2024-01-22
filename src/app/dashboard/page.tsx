import {Payment, columns} from './columns';
import {DataTable} from './data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: 'm5gr84i9',
      amount: 316,
      status: 'success',
      email: 'ken99@yahoo.com',
    },
    {
      id: '3u1reuv4',
      amount: 242,
      status: 'success',
      email: 'Abe45@gmail.com',
    },
    {
      id: 'derv1ws0',
      amount: 837,
      status: 'processing',
      email: 'Monserrat44@gmail.com',
    },
    {
      id: '5kma53ae',
      amount: 874,
      status: 'success',
      email: 'Silas22@gmail.com',
    },
    {
      id: 'bhqecj4p',
      amount: 721,
      status: 'failed',
      email: 'carmella@hotmail.com',
    },
    {
      id: 'a1b2c3d4',
      amount: Math.floor(Math.random() * 1000) + 1,
      status: ['success', 'processing', 'failed'][Math.floor(Math.random() * 3)],
      email: `${Math.floor(Math.random() * 1000)}@example.com`,
    },
    {
      id: 'e5f6g7h8',
      amount: Math.floor(Math.random() * 1000) + 1,
      status: ['success', 'processing', 'failed'][Math.floor(Math.random() * 3)],
      email: `${Math.floor(Math.random() * 1000)}@example.com`,
    },
    {
      id: 'i9j0k1l2',
      amount: Math.floor(Math.random() * 1000) + 1,
      status: ['success', 'processing', 'failed'][Math.floor(Math.random() * 3)],
      email: `${Math.floor(Math.random() * 1000)}@example.com`,
    },
    {
      id: 'm4n5b6c7',
      amount: Math.floor(Math.random() * 1000) + 1,
      status: ['success', 'processing', 'failed'][Math.floor(Math.random() * 3)],
      email: `${Math.floor(Math.random() * 1000)}@example.com`,
    },
    {
      id: 'p8r9t0u1',
      amount: Math.floor(Math.random() * 1000) + 1,
      status: ['success', 'processing', 'failed'][Math.floor(Math.random() * 3)],
      email: `${Math.floor(Math.random() * 1000)}@example.com`,
    },
    {
      id: 'v3w4x5y6',
      amount: Math.floor(Math.random() * 1000) + 1,
      status: ['success', 'processing', 'failed'][Math.floor(Math.random() * 3)],
      email: `${Math.floor(Math.random() * 1000)}@example.com`,
    },
    {
      id: 'z7a8b9c0',
      amount: Math.floor(Math.random() * 1000) + 1,
      status: ['success', 'processing', 'failed'][Math.floor(Math.random() * 3)],
      email: `${Math.floor(Math.random() * 1000)}@example.com`,
    },
    {
      id: 'd1e2f3g4',
      amount: Math.floor(Math.random() * 1000) + 1,
      status: ['success', 'processing', 'failed'][Math.floor(Math.random() * 3)],
      email: `${Math.floor(Math.random() * 1000)}@example.com`,
    },
    {
      id: 'h5i6j7k8',
      amount: Math.floor(Math.random() * 1000) + 1,
      status: ['success', 'processing', 'failed'][Math.floor(Math.random() * 3)],
      email: `${Math.floor(Math.random() * 1000)}@example.com`,
    },
    {
      id: 'n9o0p1q2',
      amount: Math.floor(Math.random() * 1000) + 1,
      status: ['success', 'processing', 'failed'][Math.floor(Math.random() * 3)],
      email: `${Math.floor(Math.random() * 1000)}@example.com`,
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
