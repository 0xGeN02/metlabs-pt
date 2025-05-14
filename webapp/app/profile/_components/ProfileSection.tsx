"use client";
import { useMemo } from 'react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const columnHelper = createColumnHelper<{ key: string; value: string }>();

interface UserData {
    name: string;
    email: string;
    birth_date: string;
    phone: string;
    sex: string;
    nationality: string;
}

const ProfileSection = (props: { userId: string; userData: UserData | null }) => {
  if (!props.userId || !props.userData) {
    return <div>Error: No se obtuvieron los datos de perfil</div>;
  }

  const data = useMemo(() => [
    { key: 'Name', value: props.userData?.name || 'N/A' },
    { key: 'Email', value: props.userData?.email || 'N/A' },
    { key: 'User ID', value: props.userId },
    { key: 'Birth Date', value: props.userData?.birth_date || 'N/A' },
    { key: 'Phone Number', value: props.userData?.phone || 'N/A' },
    { key: 'Sex', value: props.userData?.sex || 'N/A' },
    { key: 'Nationality', value: props.userData?.nationality || 'N/A' },
  ], [props.userData, props.userId]);

  const columns = useMemo(() => [
    columnHelper.accessor('key', {
      header: 'Field',
    }),
    columnHelper.accessor('value', {
      header: 'Value',
    }),
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="profile-section bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="border border-gray-300 px-4 py-2 bg-gray-100">
                  {typeof header.column.columnDef.header === 'function' ? header.column.columnDef.header(header.getContext()) : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border border-gray-300">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border border-gray-300 px-4 py-2">
                  {typeof cell.column.columnDef.cell === 'function' ? cell.column.columnDef.cell(cell.getContext()) : cell.column.columnDef.cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileSection;
