import moment from 'moment';
import { Layout, Text } from '@ui-kitten/components';

const Clock = ({ interval, style }) => {
  const duration = moment.duration(interval).asSeconds();
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  return (
    <Layout>
      <Text style={style}>
        {pad(minutes)}:{pad(seconds)}
      </Text>
    </Layout>
  );
};

const pad = (num) => {
  return ('0' + num).slice(-2);
};

export default Clock;
