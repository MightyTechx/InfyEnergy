import { useState, FC } from 'react';
import { Box, IconButton, Typography, TextField, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { useStyles } from './styles/ChatDialog.styles';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatDialogProps {
  open: boolean;
  onClose: () => void;
}

const ChatDialog: FC<ChatDialogProps> = ({ open, onClose }) => {
  const { classes, cx } = useStyles();

  // Simulated chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your InfyEnergy AI assistant. I can help you with:\n\n• Creating and managing tickets\n• User account inquiries\n• System navigation help\n• Analytics and reports\n\nHow can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "Thanks for your message! I'm still learning and evolving. For specific assistance, please contact your system administrator or explore the documentation.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!open) return null;

  return (
    <Box className={classes.overlay} onClick={onClose}>
      <Paper className={classes.dialog} onClick={(e) => e.stopPropagation()} elevation={24}>
        {/* Header */}
        <Box className={classes.header}>
          <Box className={classes.headerLeft}>
            <Box className={classes.aiIconContainer}>
              <SmartToyIcon className={classes.aiIcon} />
              <Box className={classes.pulseRing} />
              <Box className={classes.pulseRingDelay} />
            </Box>
            <Box>
              <Typography className={classes.title}>AI Assistant</Typography>
              <Box className={classes.statusIndicator}>
                <Box className={classes.statusDot} />
                <Typography className={classes.statusText}>Online</Typography>
              </Box>
            </Box>
          </Box>
          <IconButton className={classes.closeButton} onClick={onClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Messages Area */}
        <Box className={classes.messagesContainer}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              className={cx(
                classes.messageWrapper,
                msg.isUser ? classes.userMessageWrapper : classes.aiMessageWrapper,
              )}
            >
              {!msg.isUser && (
                <Box className={classes.avatarContainer}>
                  <SmartToyIcon className={classes.messageAvatarIcon} />
                </Box>
              )}
              <Box
                className={cx(
                  classes.messageBubble,
                  msg.isUser ? classes.userBubble : classes.aiBubble,
                )}
              >
                <Typography className={classes.messageText}>{msg.text}</Typography>
                <Typography className={classes.messageTime}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
              {msg.isUser && (
                <Box className={classes.avatarContainer}>
                  <PersonIcon className={classes.messageAvatarIconUser} />
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {/* Input Area */}
        <Box className={classes.inputArea}>
          <TextField
            className={classes.inputField}
            placeholder='Type your message...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            multiline
            maxRows={4}
            variant='outlined'
          />
          <IconButton
            className={cx(classes.sendButton, !input.trim() && classes.sendButtonDisabled)}
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>

        {/* Decorative elements */}
        <Box className={classes.gridOverlay} />
        <Box className={classes.glowOrb1} />
        <Box className={classes.glowOrb2} />
      </Paper>
    </Box>
  );
};

export default ChatDialog;
