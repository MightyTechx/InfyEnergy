import { useState } from 'react';
import { Box, Column, DataTable } from '@infyenergy/component';
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Autocomplete,
  IconButton,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
import { useAdminKeyframes } from 'libs/ui/hooks/useAdminKeyframes';
import { useStyles } from './styles';

// ─── Types ────────────────────────────────────────────────────────────────────

type DocType = 'PDF' | 'XLSX' | 'DOCX' | 'DWG' | 'PNG' | 'SVG';

interface DocumentRow {
  id: number;
  fileName: string;
  folder: string;
  type: DocType;
  size: string;
  modified: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FOLDERS = [
  'Operation Manuals',
  'Maintenance Guides',
  'Electrical Schematics',
  'Safety Procedures',
  'Inspection Reports',
  'Certifications',
];

const DOC_TYPES: DocType[] = ['PDF', 'XLSX', 'DOCX', 'DWG', 'PNG', 'SVG'];

const TYPE_CONFIG: Record<
  DocType,
  { bg: string; color: string; border: string; icon: React.ReactElement }
> = {
  PDF: {
    bg: 'rgba(239,68,68,0.1)',
    color: '#dc2626',
    border: 'rgba(239,68,68,0.35)',
    icon: <PictureAsPdfIcon sx={{ fontSize: 14 }} />,
  },
  XLSX: {
    bg: 'rgba(16,185,129,0.1)',
    color: '#059669',
    border: 'rgba(16,185,129,0.35)',
    icon: <TableChartIcon sx={{ fontSize: 14 }} />,
  },
  DOCX: {
    bg: 'rgba(14,165,233,0.1)',
    color: '#0284c7',
    border: 'rgba(14,165,233,0.35)',
    icon: <ArticleIcon sx={{ fontSize: 14 }} />,
  },
  DWG: {
    bg: 'rgba(245,158,11,0.1)',
    color: '#d97706',
    border: 'rgba(245,158,11,0.35)',
    icon: <InsertDriveFileIcon sx={{ fontSize: 14 }} />,
  },
  PNG: {
    bg: 'rgba(124,58,237,0.1)',
    color: '#7c3aed',
    border: 'rgba(124,58,237,0.35)',
    icon: <ImageIcon sx={{ fontSize: 14 }} />,
  },
  SVG: {
    bg: 'rgba(13,148,136,0.1)',
    color: '#0d9488',
    border: 'rgba(13,148,136,0.35)',
    icon: <InsertDriveFileIcon sx={{ fontSize: 14 }} />,
  },
};

// ─── Sample data ──────────────────────────────────────────────────────────────

const DOCUMENTS: DocumentRow[] = [
  {
    id: 1,
    fileName: 'WTG_Operation_Manual_v3.2',
    folder: 'Operation Manuals',
    type: 'PDF',
    size: '4.8 MB',
    modified: '2025-11-12',
  },
  {
    id: 2,
    fileName: 'Turbine_Maintenance_Schedule',
    folder: 'Maintenance Guides',
    type: 'XLSX',
    size: '1.2 MB',
    modified: '2025-10-05',
  },
  {
    id: 3,
    fileName: 'Gearbox_Overhaul_Procedure',
    folder: 'Maintenance Guides',
    type: 'PDF',
    size: '6.1 MB',
    modified: '2025-09-20',
  },
  {
    id: 4,
    fileName: 'Electrical_Single_Line_Diagram',
    folder: 'Electrical Schematics',
    type: 'DWG',
    size: '2.7 MB',
    modified: '2025-08-14',
  },
  {
    id: 5,
    fileName: 'Control_Panel_Wiring_Layout',
    folder: 'Electrical Schematics',
    type: 'DWG',
    size: '3.3 MB',
    modified: '2025-07-30',
  },
  {
    id: 6,
    fileName: 'Emergency_Shutdown_Protocol',
    folder: 'Safety Procedures',
    type: 'PDF',
    size: '0.9 MB',
    modified: '2025-11-01',
  },
  {
    id: 7,
    fileName: 'Hot_Work_Permit_Template',
    folder: 'Safety Procedures',
    type: 'DOCX',
    size: '0.3 MB',
    modified: '2025-10-18',
  },
  {
    id: 8,
    fileName: 'Annual_Inspection_Report_2025',
    folder: 'Inspection Reports',
    type: 'PDF',
    size: '8.4 MB',
    modified: '2026-01-07',
  },
  {
    id: 9,
    fileName: 'Blade_Inspection_Checklist',
    folder: 'Inspection Reports',
    type: 'XLSX',
    size: '0.7 MB',
    modified: '2025-12-15',
  },
  {
    id: 10,
    fileName: 'IEC_61400_Certification',
    folder: 'Certifications',
    type: 'PDF',
    size: '1.6 MB',
    modified: '2024-06-22',
  },
  {
    id: 11,
    fileName: 'ISO_9001_Quality_Certificate',
    folder: 'Certifications',
    type: 'PDF',
    size: '0.5 MB',
    modified: '2024-03-10',
  },
  {
    id: 12,
    fileName: 'Nacelle_Assembly_Diagram',
    folder: 'Operation Manuals',
    type: 'PNG',
    size: '5.2 MB',
    modified: '2025-05-28',
  },
  {
    id: 13,
    fileName: 'Tower_Bolt_Torque_Specs',
    folder: 'Maintenance Guides',
    type: 'PDF',
    size: '1.1 MB',
    modified: '2025-04-11',
  },
  {
    id: 14,
    fileName: 'SCADA_User_Guide_v2',
    folder: 'Operation Manuals',
    type: 'PDF',
    size: '3.9 MB',
    modified: '2025-06-03',
  },
  {
    id: 15,
    fileName: 'Converter_Schematic_R4',
    folder: 'Electrical Schematics',
    type: 'SVG',
    size: '0.6 MB',
    modified: '2025-03-19',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const FOLDER_SX = {
  minWidth: 220,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '&:hover fieldset': { borderColor: '#0d9488' },
    '&.Mui-focused fieldset': { borderColor: '#0d9488', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#0d9488' },
} as const;

const TYPE_SX = {
  minWidth: 160,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '&:hover fieldset': { borderColor: '#0d9488' },
    '&.Mui-focused fieldset': { borderColor: '#0d9488', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#0d9488' },
} as const;

function formatModified(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// ─── Columns ─────────────────────────────────────────────────────────────────

const columns: Column<DocumentRow>[] = [
  {
    id: 'fileName',
    label: 'File Name',
    minWidth: 240,
    sortable: true,
    align: 'left',
    format: (v) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <InsertDriveFileIcon sx={{ fontSize: 16, color: '#0d9488', flexShrink: 0 }} />
        <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1e293b' }}>
          {String(v)}
        </Typography>
      </Box>
    ),
  },
  {
    id: 'folder',
    label: 'Folder',
    minWidth: 180,
    sortable: true,
    align: 'left',
    format: (v) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <FolderIcon sx={{ fontSize: 15, color: '#f59e0b', flexShrink: 0 }} />
        <Typography sx={{ fontSize: '0.83rem', color: '#475569' }}>{String(v)}</Typography>
      </Box>
    ),
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 90,
    sortable: true,
    align: 'center',
    format: (v) => {
      const type = v as DocType;
      const cfg = TYPE_CONFIG[type] ?? {
        bg: 'rgba(100,116,139,0.1)',
        color: '#475569',
        border: 'rgba(100,116,139,0.3)',
        icon: <InsertDriveFileIcon sx={{ fontSize: 14 }} />,
      };
      return (
        <Chip
          icon={cfg.icon}
          label={type}
          size='small'
          sx={{
            background: cfg.bg,
            color: cfg.color,
            border: `1px solid ${cfg.border}`,
            fontWeight: 700,
            fontSize: '0.72rem',
            height: 24,
            '& .MuiChip-icon': { color: cfg.color, marginLeft: '6px' },
          }}
        />
      );
    },
  },
  {
    id: 'size',
    label: 'Size',
    minWidth: 90,
    sortable: true,
    align: 'center',
    format: (v) => (
      <Typography
        sx={{ fontSize: '0.83rem', color: '#64748b', fontVariantNumeric: 'tabular-nums' }}
      >
        {String(v)}
      </Typography>
    ),
  },
  {
    id: 'modified',
    label: 'Modified',
    minWidth: 120,
    sortable: true,
    align: 'center',
    format: (v) => (
      <Typography sx={{ fontSize: '0.83rem', color: '#64748b' }}>
        {formatModified(String(v))}
      </Typography>
    ),
  },
  {
    id: 'id',
    label: 'Download',
    minWidth: 90,
    sortable: false,
    align: 'center',
    format: (_v, row) => (
      <Tooltip title={`Download ${row.fileName}`} placement='left'>
        <IconButton
          size='small'
          sx={{
            color: '#0d9488',
            '&:hover': { background: 'rgba(13,148,136,0.1)' },
          }}
        >
          <DownloadIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
    ),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const TechnicalDocuments = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();

  const [folderFilter, setFolderFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [search, setSearch] = useState('');

  const filtered = DOCUMENTS.filter((row) => {
    const matchFolder = !folderFilter || row.folder === folderFilter;
    const matchType = !typeFilter || row.type === typeFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      row.fileName.toLowerCase().includes(q) ||
      row.folder.toLowerCase().includes(q) ||
      row.type.toLowerCase().includes(q);
    return matchFolder && matchType && matchSearch;
  });

  return (
    <>
      {keyframes}
      <Grid className={classes.container}>
        {/* ── Page Header ── */}
        <Box className={classes.pageHeader}>
          <Box className={classes.headerOrb} />
          <Box className={classes.pageHeaderRow}>
            <Typography variant='h5' className={classes.title}>
              Technical Documents
            </Typography>
          </Box>
          <Typography variant='body2' className={classes.description}>
            Access and manage technical documentation, manuals, and specifications.
          </Typography>
        </Box>

        {/* ── Documents Table ── */}
        <Box className={classes.tableSection}>
          <Box className={classes.tableSectionHeader}>
            <Autocomplete
              sx={FOLDER_SX}
              options={FOLDERS}
              value={folderFilter || null}
              onChange={(_, v) => setFolderFilter(v ?? '')}
              renderInput={(params) => (
                <TextField {...params} label='Folder' size='small' placeholder='Search folder…' />
              )}
            />

            <Autocomplete
              sx={TYPE_SX}
              options={DOC_TYPES}
              value={typeFilter || null}
              onChange={(_, v) => setTypeFilter(v ?? '')}
              renderInput={(params) => (
                <TextField {...params} label='File Type' size='small' placeholder='Search type…' />
              )}
            />

            <TextField
              placeholder='Search documents…'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={classes.searchField}
              size='small'
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          <Box className={classes.tableWrapper}>
            <DataTable
              columns={columns}
              data={filtered}
              rowKey='id'
              searchable={false}
              initialRowsPerPage={10}
              elevation={0}
            />
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default TechnicalDocuments;
