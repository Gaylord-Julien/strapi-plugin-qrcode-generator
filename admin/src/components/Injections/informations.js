import { Flex } from '@strapi/design-system/Flex';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import React from 'react';
import { useParams } from 'react-router-dom';

import { usePreviewData } from '../../hooks';

const QRCode = require('qrcode');

const Informations = () => {
  const { allLayoutData, initialData, isCreatingEntry } = useCMEditViewDataManager();
  const { id } = useParams();
  const { uid } = allLayoutData.contentType;
  const { data, isLoading, isSupportedType } = usePreviewData(uid, id, isCreatingEntry, [
    initialData,
  ]);

  if (!isSupportedType || isCreatingEntry || isLoading || !data || !data?.urls) {
    return null;
  }
  const { urlToEncode } = data.urls;
  let qrCode = null;
  if (urlToEncode) {
    QRCode.toString(`${urlToEncode}`, { type: 'svg' }, (err, svg) => {
      if (err) {
        qrCode = '';
      }
      qrCode = svg;
    });
  }
  return (
    <Flex justifyContent="center">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(qrCode)}`}
        width={200}
        height={200}
        alt="QR Code"
      />
    </Flex>
  );
};

export default Informations;
