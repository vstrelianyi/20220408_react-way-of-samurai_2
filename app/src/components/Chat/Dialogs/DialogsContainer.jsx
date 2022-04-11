// COMPONENTS
import Dialogs from './Dialogs';
import withAuthRedirect from '../../../hoc/withAuthRedirect';

// REDUX
import { compose } from 'redux';

const DialogsContainer = ( props ) => {
  const { dialogs, } = props;

  return <Dialogs dialogs={ dialogs }/>;
};

export default compose(
  withAuthRedirect
)( DialogsContainer );
