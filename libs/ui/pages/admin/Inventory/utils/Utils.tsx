import { useMemo } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { Box, Column } from '@infygen/component';
import { Typography, Chip } from '@mui/material';
import { InventoryRow, STATUS_CONFIG } from './inventory.utils';

export const useUtils = () => {
  const columns: Column<InventoryRow>[] = useMemo(
    () => [
      {
        id: 'id',
        label: 'S.No',
        minWidth: 70,
        sortable: true,
        align: 'center',
        format: (v: unknown) => (
          <Typography sx={{ fontSize: '0.83rem', color: '#64748b' }}>{String(v)}</Typography>
        ),
      },
      {
        id: 'photo',
        label: 'Photo',
        minWidth: 80,
        sortable: false,
        align: 'center',
        format: () => (
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '8px',
              background: 'rgba(13,148,136,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ImageIcon sx={{ fontSize: 20, color: '#0d9488' }} />
          </Box>
        ),
      },
      {
        id: 'itemCode',
        label: 'Item Code',
        minWidth: 100,
        sortable: true,
        align: 'left',
        format: (v: unknown) => (
          <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#0d9488' }}>
            {String(v)}
          </Typography>
        ),
      },
      {
        id: 'description',
        label: 'Description',
        minWidth: 180,
        sortable: true,
        align: 'left',
        format: (v: unknown) => (
          <Typography sx={{ fontSize: '0.85rem', color: '#1e293b' }}>{String(v)}</Typography>
        ),
      },
      {
        id: 'category',
        label: 'Category',
        minWidth: 130,
        sortable: true,
        align: 'left',
        format: (v: unknown) => (
          <Typography sx={{ fontSize: '0.83rem', color: '#475569' }}>{String(v)}</Typography>
        ),
      },
      {
        id: 'uom',
        label: 'UoM',
        minWidth: 70,
        sortable: true,
        align: 'center',
        format: (v: unknown) => (
          <Typography sx={{ fontSize: '0.83rem', color: '#64748b' }}>{String(v)}</Typography>
        ),
      },
      {
        id: 'quantity',
        label: 'Quantity',
        minWidth: 90,
        sortable: true,
        align: 'center',
        format: (v: unknown) => (
          <Typography
            sx={{
              fontSize: '0.85rem',
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              color: '#1e293b',
            }}
          >
            {Number(v)}
          </Typography>
        ),
      },
      {
        id: 'minimum',
        label: 'Minimum',
        minWidth: 90,
        sortable: true,
        align: 'center',
        format: (v: unknown) => (
          <Typography
            sx={{ fontSize: '0.83rem', color: '#64748b', fontVariantNumeric: 'tabular-nums' }}
          >
            {Number(v)}
          </Typography>
        ),
      },
      {
        id: 'status',
        label: 'Status',
        minWidth: 110,
        sortable: true,
        align: 'center',
        format: (v: unknown) => {
          const status = v as InventoryRow['status'];
          const cfg = STATUS_CONFIG[status];
          return (
            <Chip
              label={status}
              size='small'
              sx={{
                background: cfg.bg,
                color: cfg.color,
                fontWeight: 600,
                fontSize: '0.72rem',
                height: 24,
              }}
            />
          );
        },
      },
      {
        id: 'location',
        label: 'Location',
        minWidth: 130,
        sortable: true,
        align: 'left',
        format: (v: unknown) => (
          <Typography sx={{ fontSize: '0.83rem', color: '#475569' }}>{String(v)}</Typography>
        ),
      },
      {
        id: 'supplier',
        label: 'Supplier',
        minWidth: 130,
        sortable: true,
        align: 'left',
        format: (v: unknown) => (
          <Typography sx={{ fontSize: '0.83rem', color: '#475569' }}>{String(v)}</Typography>
        ),
      },
      {
        id: 'lastUpdated',
        label: 'Last Updated',
        minWidth: 120,
        sortable: true,
        align: 'center',
        format: (v: unknown) => (
          <Typography sx={{ fontSize: '0.83rem', color: '#64748b' }}>
            {new Date(String(v)).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Typography>
        ),
      },
    ],
    [],
  );

  return { columns };
};
