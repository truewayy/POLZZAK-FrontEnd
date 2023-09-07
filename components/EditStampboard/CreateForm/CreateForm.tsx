import { useForm } from 'react-hook-form';

import CreateFormView from './CreateFormView';

const CreateForm = () => {
  const methods = useForm({ mode: 'onChange' });

  const CreateFormVAProps = {
    methods,
  };

  return <CreateFormView {...CreateFormVAProps} />;
};

export default CreateForm;
