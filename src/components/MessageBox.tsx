import { Alert } from 'react-bootstrap';

interface props {
  variant?: string;
  children: React.ReactNode;
}

const MessageBox = ({ variant = 'info', children }: props) => {
  return <Alert variant={variant || 'info'}>{children}</Alert>;
};

export default MessageBox;
