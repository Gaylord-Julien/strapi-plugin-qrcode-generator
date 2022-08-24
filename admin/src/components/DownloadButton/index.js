import { Button } from '@strapi/design-system';
import { ExternalLink } from '@strapi/icons';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { getTrad } from '../../utils';

const DownloadButton = ({ urlToEncode }) => {
  const { formatMessage } = useIntl();

  // get root url

  const rootUrl = window.location.origin;
  console.log(rootUrl);

  const handleClick = (event) => {
    const destination = urlToEncode;

    if (!destination) {
      event.preventDefault();
      return;
    }

    window.open(`${rootUrl}/qrcode-generator?url=${encodeURIComponent(destination)}`);
  };

  return (
    <Button
      onClick={handleClick}
      size="S"
      startIcon={<ExternalLink />}
      variant="secondary"
      style={{ width: '100%' }}
    >
      {formatMessage({
        id: getTrad('label.published'),
        defaultMessage: 'Download my QR Code',
      })}
    </Button>
  );
};

DownloadButton.propTypes = {
  urlToEncode: PropTypes.string,
};

export default memo(DownloadButton);
