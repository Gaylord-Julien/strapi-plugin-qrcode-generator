import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import React from 'react';
import { useParams } from 'react-router-dom';

import { DownloadButton } from '../';
import { usePreviewData } from '../../hooks';

const RightLinks = () => {
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
  const filename = data.urls.targetFieldValue;

  return <DownloadButton urlToEncode={urlToEncode} filename={filename} />;
};

export default RightLinks;
