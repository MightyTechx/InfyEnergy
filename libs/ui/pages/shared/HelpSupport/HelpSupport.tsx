import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Grid,
} from '@mui/material';
import { PageHeader } from '@infygen/component';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useStyles } from './styles/HelpSupport.styles';
import { constants } from '@infygen/utils';

// ── FAQ Data ──────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    category: 'Getting Started',
    icon: '🚀',
    questions: [
      {
        q: 'How do I access the admin dashboard?',
        a: 'Navigate to the Dashboard from the sidebar menu. The dashboard provides an overview of all turbines, their status, power generation metrics, and real-time monitoring data.',
      },
      {
        q: 'What are the different user roles available?',
        a: 'The system supports Admin and Consultant roles. Admins have full access to all features including configuration, reports, and user management. Consultants have limited access based on enabled feature flags.',
      },
      {
        q: 'How do I configure turbine parameters?',
        a: 'Go to Turbine Config from the sidebar to view and modify turbine parameters. You can update operational thresholds, maintenance schedules, and monitoring configurations.',
      },
    ],
  },
  {
    category: 'Reports & Analytics',
    icon: '📊',
    questions: [
      {
        q: 'How do I generate a generation report?',
        a: 'Navigate to Generation Reports from the sidebar. Select your date range, filter by turbines, and click Generate Report. You can export reports in various formats.',
      },
      {
        q: 'What data is included in the incentive report?',
        a: 'Incentive reports include actual vs forecast energy generation, FER (Forecast Error Rate) percentages, and calculated incentives based on performance metrics.',
      },
      {
        q: 'Can I schedule automated reports?',
        a: 'Yes, you can set up scheduled report generation from the Reports page. Configure the frequency, recipients, and report format for automated delivery.',
      },
    ],
  },
  {
    category: 'Inventory Management',
    icon: '📦',
    questions: [
      {
        q: 'How do I track inventory items?',
        a: 'Use the Inventory Management section to add, update, and track parts and equipment. Each item can be tagged with categories, locations, and stock levels.',
      },
      {
        q: 'How do I set low-stock alerts?',
        a: 'Set threshold values for each inventory item. When stock falls below the threshold, you will receive notifications in the dashboard and via email.',
      },
    ],
  },
  {
    category: 'Technical Support',
    icon: '🔧',
    questions: [
      {
        q: 'How do I contact technical support?',
        a: 'You can reach our technical support team via email at support@infygen.in or call us during business hours. The Chat Bot is also available 24/7 for immediate assistance.',
      },
      {
        q: 'What information should I include in a support ticket?',
        a: 'Include the turbine ID, error code if any, steps to reproduce the issue, and screenshots if available. This helps our team resolve issues faster.',
      },
      {
        q: 'How long does it take to get a response?',
        a: 'Critical issues are addressed within 2 hours. Standard support requests are typically resolved within 24 business hours.',
      },
    ],
  },
];

// ── Quick Links Data ────────────────────────────────────────────────────────────
const QUICK_LINKS = [
  {
    icon: <DescriptionIcon />,
    title: 'Documentation',
    description: 'Comprehensive guides and API references',
    color: '#4f46e5',
    bgColor: 'rgba(79,70,229,0.08)',
  },
  {
    icon: <VideoLibraryIcon />,
    title: 'Video Tutorials',
    description: 'Step-by-step setup and feature walkthroughs',
    color: '#0891b2',
    bgColor: 'rgba(8,145,178,0.08)',
  },
  {
    icon: <ConfirmationNumberIcon />,
    title: 'Submit Ticket',
    description: 'Create a support ticket for specific issues',
    color: '#059669',
    bgColor: 'rgba(5,150,105,0.08)',
  },
  {
    icon: <LiveHelpIcon />,
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    color: '#d97706',
    bgColor: 'rgba(217,119,6,0.08)',
  },
];

// ── Chat Bot Suggestions ────────────────────────────────────────────────────────
const CHAT_SUGGESTIONS = [
  { icon: '💡', text: 'Show turbine status' },
  { icon: '⚡', text: 'How to improve power output?' },
  { icon: '📅', text: 'Maintenance schedule for this week' },
  { icon: '🔧', text: 'Common turbine issues and solutions' },
];

// ── Main Help & Support Component ─────────────────────────────────────────────
const HelpSupport = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const { AdminPath, ConsultantPath } = constants;

  const handleOpenChatBot = () => {
    // Trigger chat open event - Header component will handle it
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      // Search functionality placeholder
      console.log('Searching for:', searchQuery);
    }
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Filter FAQs based on search
  const filteredFaqs = searchQuery.trim()
    ? FAQ_DATA.map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      })).filter((category) => category.questions.length > 0)
    : FAQ_DATA;

  return (
    <Box className={classes.container}>
      {/* Page Header */}
      <PageHeader
        title='Help & Support'
        description='Find answers, contact support, and get assistance with our AI chatbot'
        icon={HelpOutlineIcon}
        chip={
          <Chip
            label='24/7 Support'
            size='small'
            sx={{
              height: 24,
              fontSize: '0.65rem',
              fontWeight: 700,
              background: 'rgba(34,197,94,0.1)',
              color: '#059669',
              border: '1px solid rgba(5,150,105,0.25)',
            }}
            icon={
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#22c55e',
                  mr: '2px !important',
                }}
              />
            }
          />
        }
      />

      {/* Search Bar */}
      <Paper className={classes.searchBar} elevation={0}>
        <TextField
          fullWidth
          placeholder='Search for help articles, FAQs, or topics...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          size='small'
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: '#64748b', fontSize: 20 }} />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position='end'>
                <Button
                  size='small'
                  onClick={() => setSearchQuery('')}
                  sx={{ minWidth: 'auto', p: 0.5, color: '#64748b' }}
                >
                  Clear
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Quick Actions Section */}
      <Box className={classes.section}>
        <Typography className={classes.sectionTitle}>Quick Actions</Typography>
        <Grid container spacing={2}>
          {QUICK_LINKS.map((link, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Paper
                className={classes.quickActionCard}
                elevation={0}
                onClick={link.title === 'Live Chat' ? handleOpenChatBot : undefined}
                sx={{ cursor: link.title === 'Live Chat' ? 'pointer' : 'default' }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    background: link.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1.5,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Box sx={{ color: link.color, '& .MuiSvgIcon-root': { fontSize: 24 } }}>
                    {link.icon}
                  </Box>
                </Box>
                <Typography fontWeight={700} fontSize='0.9rem' color='text.primary'>
                  {link.title}
                </Typography>
                <Typography fontSize='0.75rem' color='text.secondary' mt={0.5}>
                  {link.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Contact Cards */}
      <Box className={classes.section}>
        <Typography className={classes.sectionTitle}>Contact Information</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper className={classes.contactCard} elevation={0}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    background: 'rgba(79,70,229,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <EmailIcon sx={{ color: '#4f46e5', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography
                    fontSize='0.72rem'
                    color='text.secondary'
                    fontWeight={600}
                    textTransform='uppercase'
                    letterSpacing='0.05em'
                  >
                    Email Support
                  </Typography>
                  <Typography fontWeight={700} fontSize='1rem'>
                    support@infygen.in
                  </Typography>
                  <Typography fontSize='0.75rem' color='text.disabled'>
                    Response within 24 hours
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper className={classes.contactCard} elevation={0}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    background: 'rgba(16,185,129,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PhoneIcon sx={{ color: '#059669', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography
                    fontSize='0.72rem'
                    color='text.secondary'
                    fontWeight={600}
                    textTransform='uppercase'
                    letterSpacing='0.05em'
                  >
                    Phone Support
                  </Typography>
                  <Typography fontWeight={700} fontSize='1rem'>
                    +91 1800-XXX-XXXX
                  </Typography>
                  <Typography fontSize='0.75rem' color='text.disabled'>
                    Mon-Fri, 9 AM - 6 PM IST
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* AI Chat Assistant Card */}
      <Card className={classes.chatAssistantCard} elevation={0}>
        <Box className={classes.chatAssistantContent}>
          <Box className={classes.chatAssistantLeft}>
            <Box className={classes.botAvatar}>
              <SmartToyIcon sx={{ fontSize: 28, color: '#fff' }} />
              <Box className={classes.onlineIndicator} />
            </Box>
            <Box>
              <Typography fontWeight={700} fontSize='1.1rem'>
                AI Assistant Available 24/7
              </Typography>
              <Typography fontSize='0.82rem' color='text.secondary' mt={0.5}>
                Get instant help from our AI chatbot for common queries, troubleshooting, and
                guidance.
              </Typography>
            </Box>
          </Box>
          <Button
            variant='contained'
            startIcon={<SmartToyIcon />}
            onClick={handleOpenChatBot}
            className={classes.chatButton}
          >
            Open AI Assistant
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography
          fontWeight={700}
          fontSize='0.8rem'
          color='text.secondary'
          mb={1.5}
          textTransform='uppercase'
          letterSpacing='0.05em'
        >
          Try asking
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {CHAT_SUGGESTIONS.map((suggestion, idx) => (
            <Chip
              key={idx}
              label={suggestion.text}
              size='small'
              icon={<Typography sx={{ fontSize: '0.9rem', ml: 0.5 }}>{suggestion.icon}</Typography>}
              onClick={handleOpenChatBot}
              sx={{
                height: 32,
                fontSize: '0.78rem',
                fontWeight: 500,
                background: 'rgba(99,102,241,0.06)',
                color: '#4f46e5',
                border: '1px solid rgba(99,102,241,0.15)',
                cursor: 'pointer',
                '&:hover': {
                  background: 'rgba(99,102,241,0.12)',
                  borderColor: 'rgba(99,102,241,0.3)',
                },
              }}
            />
          ))}
        </Box>
      </Card>

      {/* FAQ Section */}
      <Box className={classes.section}>
        <Typography className={classes.sectionTitle}>Frequently Asked Questions</Typography>
        {filteredFaqs.length === 0 ? (
          <Paper className={classes.noResults} elevation={0}>
            <Typography fontWeight={600} color='text.secondary'>
              No results found for "{searchQuery}"
            </Typography>
            <Typography fontSize='0.82rem' color='text.disabled' mt={0.5}>
              Try a different search term or browse all categories
            </Typography>
            <Button size='small' onClick={() => setSearchQuery('')} sx={{ mt: 1.5 }}>
              Clear Search
            </Button>
          </Paper>
        ) : (
          filteredFaqs.map((category) => (
            <Box key={category.category} className={classes.faqCategory}>
              <Box className={classes.faqCategoryHeader}>
                <Typography sx={{ fontSize: '1.2rem' }}>{category.icon}</Typography>
                <Typography fontWeight={700} fontSize='0.9rem' color='text.primary'>
                  {category.category}
                </Typography>
              </Box>
              {category.questions.map((item, idx) => {
                const faqId = `${category.category}-${idx}`;
                return (
                  <Accordion
                    key={idx}
                    expanded={expandedFaq === faqId}
                    onChange={() => toggleFaq(faqId)}
                    className={classes.faqAccordion}
                    disableGutters
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: '#4f46e5' }} />}
                      className={classes.faqAccordionSummary}
                    >
                      <Typography fontWeight={600} fontSize='0.88rem'>
                        {item.q}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.faqAccordionDetails}>
                      <Typography
                        component='p'
                        fontSize='0.82rem'
                        color='text.secondary'
                        sx={{ lineHeight: 1.7 }}
                      >
                        {item.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          ))
        )}
      </Box>

      {/* Need More Help Section */}
      <Paper className={classes.needHelpCard} elevation={0}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 8px 24px rgba(79,70,229,0.35)',
            }}
          >
            <HelpOutlineIcon sx={{ fontSize: 32, color: '#fff' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography fontWeight={700} fontSize='1.1rem'>
              Still need help?
            </Typography>
            <Typography fontSize='0.85rem' color='text.secondary' mt={0.5}>
              Our support team is here to assist you with any questions or issues.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant='outlined'
              startIcon={<EmailIcon />}
              onClick={() => window.open('mailto:support@infygen.in', '_blank')}
              className={classes.needHelpButton}
            >
              Email Us
            </Button>
            <Button
              variant='contained'
              startIcon={<SmartToyIcon />}
              onClick={handleOpenChatBot}
              className={classes.needHelpButton}
            >
              Chat Now
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default HelpSupport;
