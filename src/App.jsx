import { Admin, Resource, ListGuesser } from 'react-admin';
import dataProvider from './dataProvider';
import Dashboard  from './components/Dashboard/Dashboard';

const App = () => (
  <Admin dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource name="indonesia_data_centers" list={ListGuesser} />
  </Admin>
);

export default App;
