import { Button, Select, Option } from '@strapi/design-system';
import { Download } from '@strapi/icons';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { getTrad } from '../../utils';

const DownloadButton = ({ urlToEncode, filename }) => {
  const { formatMessage } = useIntl();
  const [extension, setExtension] = React.useState('svg');

  // get root url
  const rootUrl = window.location.origin;
  const handleClick = (event) => {
    const destination = urlToEncode;

    if (!destination) {
      event.preventDefault();
      return;
    }

    window.open(
      `${rootUrl}/qrcode-generator?url=${encodeURIComponent(
        destination
      )}&filename=${filename}&ext=${extension}&download=true`,
      '_self'
    );
  };

  console.log('extension', extension);

  return (
    <>
      <Select
        label={'Select extension'}
        placeholder={'Select extension'}
        name="extension"
        onChange={(e) => setExtension(e)}
        value={extension}
        onClear={() => setExtension('svg')}
      >
        <Option value="svg">SVG</Option>
        <Option value="png">PNG</Option>
        <Option value="jpeg">JPEG</Option>
        <Option value="jpg">JPG</Option>
      </Select>
      <Button
        onClick={handleClick}
        size="S"
        startIcon={<Download />}
        variant="secondary"
        style={{ width: '100%' }}
      >
        {formatMessage({
          id: getTrad('label.button'),
          defaultMessage: 'Download my QR Code',
        })}
      </Button>
    </>
  );
};

DownloadButton.propTypes = {
  urlToEncode: PropTypes.string,
  filename: PropTypes.string,
};

export default memo(DownloadButton);
