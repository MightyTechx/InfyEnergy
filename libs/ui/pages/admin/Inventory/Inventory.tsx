import { useState } from 'react';
import {
  Box,
  DataTable,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
} from '@infygen/component';
import {
  CircularProgress,
  Autocomplete,
  Dialog,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallMadeIcon from '@mui/icons-material/CallMade';
import SyncIcon from '@mui/icons-material/Sync';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import InventoryIcon from '@mui/icons-material/Inventory2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAdminKeyframes } from '@infygen/hooks';
import { useStyles } from './styles';
import {
  InventoryRow,
  CATEGORIES,
  LOCATIONS,
  STATUSES,
  INVENTORY_DATA,
} from './utils/inventory.utils';
import { Utils } from './utils/Utils';

const CATEGORY_OPTIONS = ['Hydraulic', 'Mechanical', 'Electrical', 'Tools'];
const UOM_OPTIONS = ['PCS', 'SET', 'm', 'L', 'KG', 'BOX', 'ROLL'];

interface ItemForm {
  itemCode: string;
  category: string;
  description: string;
  specifications: string;
  unitOfMeasure: string;
  location: string;
  supplier: string;
  minimumStock: string;
  openingQty: string;
}

const BLANK_FORM: ItemForm = {
  itemCode: '',
  category: '',
  description: '',
  specifications: '',
  unitOfMeasure: '',
  location: '',
  supplier: '',
  minimumStock: '',
  openingQty: '',
};

const Inventory = () => {
  const { classes } = useStyles();
  const keyframes = useAdminKeyframes();
  const { columns } = Utils();

  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<InventoryRow['status'] | ''>('');
  const [search, setSearch] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ItemForm>(BLANK_FORM);
  const [isSaving, setIsSaving] = useState(false);

  const filtered = INVENTORY_DATA.filter((row) => {
    const matchCategory = !categoryFilter || row.category === categoryFilter;
    const matchLocation = !locationFilter || row.location === locationFilter;
    const matchStatus = !statusFilter || row.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      row.itemCode.toLowerCase().includes(q) ||
      row.description.toLowerCase().includes(q) ||
      row.category.toLowerCase().includes(q);
    return matchCategory && matchLocation && matchStatus && matchSearch;
  });

  const openAddDialog = () => {
    setForm(BLANK_FORM);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setForm(BLANK_FORM);
  };

  const handleSave = async () => {
    if (!form.itemCode.trim() || !form.description.trim()) return;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    closeDialog();
  };

  const updateForm = (field: keyof ItemForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = form.itemCode.trim() && form.description.trim();

  return (
    <>
      {keyframes}
      <Grid className={classes.container}>
        {/* ── Page Header ── */}
        <Box className={classes.pageHeader}>
          <Box className={classes.headerOrb} />
          <Box className={classes.pageHeaderRow}>
            <Typography variant='h5' className={classes.title}>
              Inventory Management
            </Typography>
          </Box>
          <Typography variant='body2' className={classes.description}>
            Manage stock master, item photos/specifications, and track stock movements (Receive /
            Issue / Adjust).
          </Typography>
        </Box>

        {/* ── Action Buttons ── */}
        <Box className={classes.actionButtonsSection}>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            className={`${classes.actionButtonBase} ${classes.actionButtonAdd}`}
            onClick={openAddDialog}
          >
            Add Item
          </Button>
          <Button
            variant='contained'
            startIcon={<CallReceivedIcon />}
            className={`${classes.actionButtonBase} ${classes.actionButtonReceive}`}
          >
            Receive
          </Button>
          <Button
            variant='contained'
            startIcon={<CallMadeIcon />}
            className={`${classes.actionButtonBase} ${classes.actionButtonIssue}`}
          >
            Issue
          </Button>
          <Button
            variant='contained'
            startIcon={<SyncIcon />}
            className={`${classes.actionButtonBase} ${classes.actionButtonAdjust}`}
          >
            Adjust
          </Button>
          <Box className={classes.actionButtonsDivider} />
          <Button
            variant='contained'
            startIcon={<FileDownloadIcon />}
            className={`${classes.actionButtonBase} ${classes.actionButtonExport}`}
          >
            Export
          </Button>
          <Button
            variant='contained'
            startIcon={<FileUploadIcon />}
            className={`${classes.actionButtonBase} ${classes.actionButtonImport}`}
          >
            Import
          </Button>
        </Box>

        {/* ── Inventory Table ── */}
        <Box className={classes.tableSection}>
          <Box className={classes.tableSectionHeader}>
            <Autocomplete
              className={classes.filterAutocomplete}
              options={CATEGORIES}
              value={categoryFilter || null}
              onChange={(_, v) => setCategoryFilter(v ?? '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Category'
                  size='small'
                  placeholder='Search category…'
                />
              )}
            />

            <Autocomplete
              className={classes.filterAutocomplete}
              options={LOCATIONS}
              value={locationFilter || null}
              onChange={(_, v) => setLocationFilter(v ?? '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Location'
                  size='small'
                  placeholder='Search location…'
                />
              )}
            />

            <Autocomplete
              className={classes.filterAutocompleteSmall}
              options={STATUSES}
              value={statusFilter || null}
              onChange={(_, v) => setStatusFilter(v ?? '')}
              renderInput={(params) => (
                <TextField {...params} label='Status' size='small' placeholder='Search status…' />
              )}
            />

            <TextField
              placeholder='Search items…'
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

      {/* ── Add Item Dialog ── */}
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        maxWidth='md'
        fullWidth
        className={classes.dialog}
      >
        {/* Modal Header */}
        <Box className={classes.modalHero}>
          <Box className={classes.modalIconBox}>
            <InventoryIcon sx={{ fontSize: 26, color: '#fff' }} />
          </Box>
          <Box className={classes.modalTitleBox}>
            <Typography className={classes.modalTitle}>Add New Item</Typography>
            <Typography className={classes.modalSubtitle}>
              Fill in the details to add a new inventory item
            </Typography>
          </Box>
          <IconButton onClick={closeDialog} className={classes.modalCloseBtn} size='small'>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>

        <DialogContent className={classes.dialogContent}>
          <Grid container spacing={2}>
            {/* Item Code */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Item Code *'
                placeholder='Ex: WT-BRK-PAD-001'
                value={form.itemCode}
                onChange={(e) => updateForm('itemCode', e.target.value)}
                className={classes.formField}
                size='small'
                fullWidth
              />
            </Grid>

            {/* Category */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Autocomplete
                options={CATEGORY_OPTIONS}
                value={form.category || null}
                onChange={(_, v) => updateForm('category', v ?? '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Category'
                    size='small'
                    placeholder='Select category'
                  />
                )}
                className={classes.formField}
              />
            </Grid>

            {/* Description */}
            <Grid size={12}>
              <TextField
                label='Description *'
                placeholder='Enter item description'
                value={form.description}
                onChange={(e) => updateForm('description', e.target.value)}
                className={classes.formFieldFull}
                size='small'
                fullWidth
                multiline
                rows={2}
              />
            </Grid>

            {/* Specifications */}
            <Grid size={12}>
              <TextField
                label='Specifications'
                placeholder='Enter detailed specifications'
                value={form.specifications}
                onChange={(e) => updateForm('specifications', e.target.value)}
                className={classes.formFieldFull}
                size='small'
                fullWidth
                multiline
                rows={3}
              />
            </Grid>

            {/* Unit of Measure */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Autocomplete
                options={UOM_OPTIONS}
                value={form.unitOfMeasure || null}
                onChange={(_, v) => updateForm('unitOfMeasure', v ?? '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Unit of Measure'
                    size='small'
                    placeholder='Select UOM'
                  />
                )}
                className={classes.formField}
              />
            </Grid>

            {/* Location */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Autocomplete
                options={LOCATIONS}
                value={form.location || null}
                onChange={(_, v) => updateForm('location', v ?? '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Location'
                    size='small'
                    placeholder='Select location'
                  />
                )}
                className={classes.formField}
              />
            </Grid>

            {/* Supplier */}
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Supplier'
                placeholder='Enter vendor name'
                value={form.supplier}
                onChange={(e) => updateForm('supplier', e.target.value)}
                className={classes.formField}
                size='small'
                fullWidth
              />
            </Grid>

            {/* Minimum Stock */}
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Minimum Stock'
                type='number'
                placeholder='0'
                value={form.minimumStock}
                onChange={(e) => updateForm('minimumStock', e.target.value)}
                className={classes.formField}
                size='small'
                fullWidth
              />
            </Grid>

            {/* Opening Qty */}
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Opening Qty'
                type='number'
                placeholder='0'
                value={form.openingQty}
                onChange={(e) => updateForm('openingQty', e.target.value)}
                className={classes.formField}
                size='small'
                fullWidth
              />
            </Grid>

            {/* Photo Upload */}
            <Grid size={{ xs: 12 }}>
              <Box className={classes.photoUpload}>
                <Box className={classes.photoUploadIcon}>
                  <CloudUploadIcon sx={{ fontSize: 24, color: '#0d9488' }} />
                </Box>
                <Typography className={classes.photoUploadText}>Click to upload photo</Typography>
                <Typography className={classes.photoUploadHint}>PNG, JPG up to 5MB</Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Button onClick={closeDialog} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!isFormValid || isSaving}
            className={classes.submitButton}
            startIcon={
              isSaving ? (
                <CircularProgress size={16} color='inherit' />
              ) : (
                <AddIcon fontSize='small' />
              )
            }
          >
            {isSaving ? 'Saving…' : 'Add Item'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Inventory;
