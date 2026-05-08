import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { useStyles } from '../../styles';

export default function ContactSection() {
  const { classes, cx } = useStyles();

  return (
    <Box id='contact' className={cx(classes.section, classes.contactSection)}>
      <Box className={cx(classes.sectionHeader, 'reveal')}>
        <Box className={classes.sectionEyebrow}>SECURE UPLINK</Box>
        <Typography className={classes.sectionTitle}>Establish Connection</Typography>
        <Box className={classes.sectionLine} />
      </Box>
      <Box className={classes.contactWrap}>
        <Box className={cx(classes.contactInfo, 'reveal')}>
          <Typography component='h3'>Ready to synchronize?</Typography>
          <Typography>
            Reach out to our operations team for SCADA integration, yield analytics partnerships, or
            technical support. All transmissions are encrypted end-to-end.
          </Typography>
          <Box className={classes.contactDetail}>
            <Box className={classes.cdItem}>
              <Box className={classes.cdIcon}>📍</Box>
              <Box className={classes.cdText}>
                <Typography component='span' className={classes.cdLabel}>
                  LOCATION
                </Typography>
                <Typography component='span' className={classes.cdValue}>
                  Operations Command Center
                </Typography>
              </Box>
            </Box>
            <Box className={classes.cdItem}>
              <Box className={classes.cdIcon}>📡</Box>
              <Box className={classes.cdText}>
                <Typography component='span' className={classes.cdLabel}>
                  SCADA NODE
                </Typography>
                <Typography component='span' className={classes.cdValue}>
                  Node-Alpha / 24×7 Monitoring
                </Typography>
              </Box>
            </Box>
            <Box className={classes.cdItem}>
              <Box className={classes.cdIcon}>🔒</Box>
              <Box className={classes.cdText}>
                <Typography component='span' className={classes.cdLabel}>
                  SECURITY
                </Typography>
                <Typography component='span' className={classes.cdValue}>
                  AES-256 Encrypted Channel
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className='reveal reveal-delay-2'>
          <Box
            component='form'
            className={classes.contactForm}
            onSubmit={(e) => e.preventDefault()}
          >
            <Box className={classes.formRow}>
              <TextField
                placeholder='Operator ID'
                className={classes.inputField}
                size='small'
                fullWidth
              />
              <TextField
                placeholder='Email Address'
                className={classes.inputField}
                size='small'
                type='email'
                fullWidth
              />
            </Box>
            <TextField
              select
              className={classes.inputField}
              SelectProps={{ native: true }}
              size='small'
              fullWidth
              defaultValue=''
            >
              <option value='' disabled>
                Select Request Type
              </option>
              <option>SCADA Integration</option>
              <option>Yield Analytics</option>
              <option>Technical Support</option>
              <option>Partnership Inquiry</option>
            </TextField>
            <TextField
              placeholder='Message Protocol — describe your request...'
              className={classes.inputField}
              multiline
              rows={4}
              fullWidth
            />
            <Button type='submit' className={classes.btnSubmit} fullWidth>
              ▶ TRANSMIT UPLINK
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
