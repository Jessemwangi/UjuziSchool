import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4rem;
  margin: 6rem;
  border: 1px solid #ccc;
  padding: 2rem;
  background-color: ${(props) => props.backgroundColor || '#f0f0f0'};
  color: ${(props) => props.textColor || '#333'};
`;

const MessageText = styled(Typography)`
  text-align: center;
`;

const MessageInfo = ({ message, backgroundColor, textColor, show = true }) => {
  return (
    <Container backgroundColor={backgroundColor} textColor={textColor}>
      <MessageText variant="h4" component="span" style={{textTransform:"capitalize"}}>
        {message}
      </MessageText>
     {show && <p>You will have to click the link from your email account. An email link has been sent to your email address.</p>}
    </Container>
  );
};

MessageInfo.propTypes = {
  message: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default MessageInfo;
