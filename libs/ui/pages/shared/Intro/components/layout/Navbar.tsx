import { Box, Typography } from '@mui/material';
import { useStyles } from '../../styles';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Platform', href: '#platform' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  scrolled: boolean;
  onNavigate: (href: string) => void;
  onSignIn: () => void;
  tenant: string;
}

export default function Navbar({ scrolled, onNavigate, onSignIn, tenant }: NavbarProps) {
  const { classes, cx } = useStyles();

  return (
    <Box component='header' className={cx(classes.header, scrolled && classes.headerScrolled)}>
      <Box className={classes.logoContainer} onClick={() => onNavigate('#home')}>
        <svg
          className={classes.headerTurbine}
          viewBox='0 0 100 100'
          style={{ width: 36, height: 36 }}
        >
          <path
            d='M47 42 L53 42 L56 92 L44 92 Z'
            stroke='rgba(0,242,255,0.5)'
            strokeWidth={2}
            fill='none'
          />
          <g style={{ transformOrigin: '50px 42px', animation: 'spin 5s linear infinite' }}>
            <circle cx={50} cy={42} r={3} fill='var(--neon-cyan)' />
            <path d='M50 42 L50 3 Q63 3 57 42 Z' fill='var(--neon-cyan)' />
            <path d='M50 42 L87 66 Q92 77 50 50 Z' fill='var(--neon-cyan)' />
            <path d='M50 42 L13 66 Q8 77 50 50 Z' fill='var(--neon-cyan)' />
          </g>
        </svg>
        <Typography component='span'>{tenant.toUpperCase()}</Typography>
      </Box>

      <nav>
        <Box component='ul' className={classes.navList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Box
                component='a'
                href={item.href}
                className={classes.navLink}
                onClick={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  if (item.label === 'Contact') {
                    onSignIn();
                  } else {
                    onNavigate(item.href);
                  }
                }}
              >
                {item.label}
              </Box>
            </li>
          ))}
          <li>
            <Box component='a' className={cx(classes.navLink, classes.navCta)} onClick={onSignIn}>
              Sign In
            </Box>
          </li>
        </Box>
      </nav>
    </Box>
  );
}
