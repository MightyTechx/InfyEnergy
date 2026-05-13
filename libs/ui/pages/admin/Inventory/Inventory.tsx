import { useState } from 'react';
import {
  Box,
  DataTable,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  PageHeader,
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

  // Receive Dialog State
  const [receiveDialogOpen, setReceiveDialogOpen] = useState(false);
  const [receiveForm, setReceiveForm] = useState({
    item: null as InventoryRow | null,
    contractor: '',
    quantity: '1',
    reference: '',
    remarks: '',
  });
  const [receiveSaving, setReceiveSaving] = useState(false);

  // Issue Dialog State
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [issueForm, setIssueForm] = useState({
    item: null as InventoryRow | null,
    contractor: '',
    quantity: '1',
    reference: '',
    remarks: '',
  });
  const [issueSaving, setIssueSaving] = useState(false);

  // Adjust Dialog State
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [adjustForm, setAdjustForm] = useState({
    item: null as InventoryRow | null,
    contractor: '',
    quantity: '',
    reference: '',
    remarks: '',
  });
  const [adjustSaving, setAdjustSaving] = useState(false);

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

  // Receive handlers
  const openReceiveDialog = () => {
    setReceiveForm({ item: null, contractor: '', quantity: '1', reference: '', remarks: '' });
    setReceiveDialogOpen(true);
  };
  const closeReceiveDialog = () => {
    setReceiveDialogOpen(false);
    setReceiveForm({ item: null, contractor: '', quantity: '1', reference: '', remarks: '' });
  };
  const handleReceiveSave = async () => {
    if (!receiveForm.item || !receiveForm.quantity) return;
    setReceiveSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setReceiveSaving(false);
    closeReceiveDialog();
  };

  // Issue handlers
  const openIssueDialog = () => {
    setIssueForm({ item: null, contractor: '', quantity: '1', reference: '', remarks: '' });
    setIssueDialogOpen(true);
  };
  const closeIssueDialog = () => {
    setIssueDialogOpen(false);
    setIssueForm({ item: null, contractor: '', quantity: '1', reference: '', remarks: '' });
  };
  const handleIssueSave = async () => {
    if (!issueForm.item || !issueForm.quantity) return;
    setIssueSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setIssueSaving(false);
    closeIssueDialog();
  };

  // Adjust handlers
  const openAdjustDialog = () => {
    setAdjustForm({ item: null, contractor: '', quantity: '', reference: '', remarks: '' });
    setAdjustDialogOpen(true);
  };
  const closeAdjustDialog = () => {
    setAdjustDialogOpen(false);
    setAdjustForm({ item: null, contractor: '', quantity: '', reference: '', remarks: '' });
  };
  const handleAdjustSave = async () => {
    if (!adjustForm.item || !adjustForm.quantity) return;
    setAdjustSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setAdjustSaving(false);
    closeAdjustDialog();
  };

  return (
    <>
      {keyframes}
      <Grid className={classes.container}>
        {/* ── Page Header ── */}
        <PageHeader
          title='Inventory Management'
          description='Track and manage inventory items, stock levels, and supplier information.'
          icon={InventoryIcon}
          variant='admin'
        />

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
            onClick={openReceiveDialog}
          >
            Receive
          </Button>
          <Button
            variant='contained'
            startIcon={<CallMadeIcon />}
            className={`${classes.actionButtonBase} ${classes.actionButtonIssue}`}
            onClick={openIssueDialog}
          >
            Issue
          </Button>
          <Button
            variant='contained'
            startIcon={<SyncIcon />}
            className={`${classes.actionButtonBase} ${classes.actionButtonAdjust}`}
            onClick={openAdjustDialog}
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

      {/* ── Receive Material Dialog ── */}
      <Dialog
        open={receiveDialogOpen}
        onClose={closeReceiveDialog}
        maxWidth='sm'
        fullWidth
        className={classes.dialog}
      >
        <Box className={classes.modalHeroReceive}>
          <Box className={classes.modalIconBoxReceive}>
            <CallReceivedIcon sx={{ fontSize: 26, color: '#fff' }} />
          </Box>
          <Box className={classes.modalTitleBox}>
            <Typography className={classes.modalTitle}>Receive Material</Typography>
            <Typography className={classes.modalSubtitle}>
              Record incoming stock from supplier or contractor
            </Typography>
          </Box>
          <IconButton onClick={closeReceiveDialog} className={classes.modalCloseBtn} size='small'>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>

        <DialogContent className={classes.dialogContent}>
          <Grid container spacing={2.5}>
            {/* Item */}
            <Grid size={12}>
              <Autocomplete
                options={INVENTORY_DATA}
                getOptionLabel={(opt) => `${opt.itemCode} — ${opt.description}`}
                value={receiveForm.item}
                onChange={(_, v) => setReceiveForm((p) => ({ ...p, item: v }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Item *'
                    size='small'
                    placeholder='Search or select item…'
                  />
                )}
                className={classes.formField}
              />
            </Grid>

            {/* Contractor */}
            <Grid size={12}>
              <TextField
                label='Contractor / Supplier'
                placeholder='Enter contractor or supplier name'
                value={receiveForm.contractor}
                onChange={(e) => setReceiveForm((p) => ({ ...p, contractor: e.target.value }))}
                className={classes.formField}
                size='small'
                fullWidth
              />
            </Grid>

            {/* Quantity */}
            <Grid size={6}>
              <TextField
                label='Quantity *'
                type='number'
                placeholder='1'
                value={receiveForm.quantity}
                onChange={(e) => setReceiveForm((p) => ({ ...p, quantity: e.target.value }))}
                className={classes.formField}
                size='small'
                fullWidth
              />
            </Grid>

            {/* Reference */}
            <Grid size={6}>
              <TextField
                label='Reference (GRN / PO / Work Order)'
                placeholder='GRN-2026-001'
                value={receiveForm.reference}
                onChange={(e) => setReceiveForm((p) => ({ ...p, reference: e.target.value }))}
                className={classes.formField}
                size='small'
                fullWidth
              />
            </Grid>

            {/* Remarks */}
            <Grid size={12}>
              <TextField
                label='Remarks'
                placeholder='Optional notes…'
                value={receiveForm.remarks}
                onChange={(e) => setReceiveForm((p) => ({ ...p, remarks: e.target.value }))}
                className={classes.formField}
                size='small'
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Button onClick={closeReceiveDialog} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button
            onClick={handleReceiveSave}
            disabled={!receiveForm.item || !receiveForm.quantity}
            className={classes.submitButtonReceive}
            startIcon={
              receiveSaving ? (
                <CircularProgress size={16} color='inherit' />
              ) : (
                <CallReceivedIcon fontSize='small' />
              )
            }
          >
            {receiveSaving ? 'Saving…' : 'Receive'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Issue / Download Material Dialog ── */}
      <Dialog
        open={issueDialogOpen}
        onClose={closeIssueDialog}
        maxWidth='sm'
        fullWidth
        className={classes.dialog}
      >
        <Box className={classes.modalHeroIssue}>
          <Box className={classes.modalIconBoxIssue}>
            <CallMadeIcon sx={{ fontSize: 26, color: '#fff' }} />
          </Box>
          <Box className={classes.modalTitleBox}>
            <Typography className={classes.modalTitle}>Issue / Download Material</Typography>
            <Typography className={classes.modalSubtitle}>
              Record material issued for maintenance or project use
            </Typography>
          </Box>
          <IconButton onClick={closeIssueDialog} className={classes.modalCloseBtn} size='small'>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>

        <DialogContent className={classes.dialogContent}>
          <Grid container spacing={2.5}>
            {/* Item */}
            <Grid size={12}>
              <Autocomplete
                options={INVENTORY_DATA}
                getOptionLabel={(opt) => `${opt.itemCode} — ${opt.description}`}
                value={issueForm.item}
                onChange={(_, v) => setIssueForm((p) => ({ ...p, item: v }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Item *'
                    size='small'
                    placeholder='Search or select item…'
                  />
                )}
                className={classes.formField}
              />
            </Grid>

            {/* Contractor */}
            <Grid size={12}>
              <TextField
                label='Contractor / Technician'
                placeholder='Enter contractor or technician name'
                value={issueForm.contractor}
                onChange={(e) => setIssueForm((p) => ({ ...p, contractor: e.target.value }))}
                className={classes.formField}
                size='small'
                fullWidth
              />
            </Grid>

            {/* Quantity */}
            <Grid size={6}>
              <TextField
                label='Quantity *'
                type='number'
                placeholder='1'
                value={issueForm.quantity}
                onChange={(e) => setIssueForm((p) => ({ ...p, quantity: e.target.value }))}
                className={classes.formField}
                size='small'
                fullWidth
              />
            </Grid>

            {/* Reference */}
            <Grid size={6}>
              <TextField
                label='Reference (Work Order / Ticket)'
                placeholder='WO-2026-045'
                value={issueForm.reference}
                onChange={(e) => setIssueForm((p) => ({ ...p, reference: e.target.value }))}
                className={classes.formField}
                size='small'
                fullWidth
              />
            </Grid>

            {/* Remarks */}
            <Grid size={12}>
              <TextField
                label='Remarks'
                placeholder='Optional notes…'
                value={issueForm.remarks}
                onChange={(e) => setIssueForm((p) => ({ ...p, remarks: e.target.value }))}
                className={classes.formField}
                size='small'
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Button onClick={closeIssueDialog} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button
            onClick={handleIssueSave}
            disabled={!issueForm.item || !issueForm.quantity}
            className={classes.submitButtonIssue}
            startIcon={
              issueSaving ? (
                <CircularProgress size={16} color='inherit' />
              ) : (
                <CallMadeIcon fontSize='small' />
              )
            }
          >
            {issueSaving ? 'Saving…' : 'Issue'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Adjust Stock Dialog ── */}
      <Dialog
        open={adjustDialogOpen}
        onClose={closeAdjustDialog}
        maxWidth='sm'
        fullWidth
        className={classes.dialog}
      >
        <Box className={classes.modalHeroAdjust}>
          <Box className={classes.modalIconBoxAdjust}>
            <SyncIcon sx={{ fontSize: 26, color: '#fff' }} />
          </Box>
          <Box className={classes.modalTitleBox}>
            <Typography className={classes.modalTitle}>Adjust Stock</Typography>
            <Typography className={classes.modalSubtitle}>
              Correct inventory levels (damage, loss, audit correction)
            </Typography>
          </Box>
          <IconButton onClick={closeAdjustDialog} className={classes.modalCloseBtn} size='small'>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>

        <DialogContent className={classes.dialogContent}>
          <Grid container spacing={2.5}>
            {/* Item */}
            <Grid size={12}>
              <Autocomplete
                options={INVENTORY_DATA}
                getOptionLabel={(opt) => `${opt.itemCode} — ${opt.description}`}
                value={adjustForm.item}
                onChange={(_, v) => setAdjustForm((p) => ({ ...p, item: v }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Item *'
                    size='small'
                    placeholder='Search or select item…'
                  />
                )}
                className={classes.formField}
              />
            </Grid>

            {/* Contractor */}
            <Grid size={12}>
              <TextField
                label='Recorded By'
                placeholder='Enter staff or auditor name'
                value={adjustForm.contractor}
                onChange={(e) => setAdjustForm((p) => ({ ...p, contractor: e.target.value }))}
                className={classes.formField}
                size='small'
                fullWidth
              />
            </Grid>

            {/* Quantity */}
            <Grid size={6}>
              <TextField
                label='Adjusted Quantity *'
                type='number'
                placeholder='0'
                value={adjustForm.quantity}
                onChange={(e) => setAdjustForm((p) => ({ ...p, quantity: e.target.value }))}
                className={classes.formField}
                size='small'
                fullWidth
              />
            </Grid>

            {/* Reference */}
            <Grid size={6}>
              <TextField
                label='Reference (Audit / Adjustment Note)'
                placeholder='ADJ-2026-012'
                value={adjustForm.reference}
                onChange={(e) => setAdjustForm((p) => ({ ...p, reference: e.target.value }))}
                className={classes.formField}
                size='small'
                fullWidth
              />
            </Grid>

            {/* Remarks */}
            <Grid size={12}>
              <TextField
                label='Reason for Adjustment'
                placeholder='Describe reason (damage, loss, audit, etc.)…'
                value={adjustForm.remarks}
                onChange={(e) => setAdjustForm((p) => ({ ...p, remarks: e.target.value }))}
                className={classes.formField}
                size='small'
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Button onClick={closeAdjustDialog} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button
            onClick={handleAdjustSave}
            disabled={!adjustForm.item || !adjustForm.quantity}
            className={classes.submitButtonAdjust}
            startIcon={
              adjustSaving ? (
                <CircularProgress size={16} color='inherit' />
              ) : (
                <SyncIcon fontSize='small' />
              )
            }
          >
            {adjustSaving ? 'Saving…' : 'Adjust Stock'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Inventory;
