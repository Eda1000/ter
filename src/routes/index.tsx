import { Switch, BrowserRouter } from 'react-router-dom';

import { Route } from './Route';

import { Home } from '../pages/Home';
import { Order } from '../pages/Order';
import { ManualCreate } from '../pages/ManualCreate';

import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ForgotPassword } from '../pages/ForgotPassword';

import { EditTruck } from '../pages/EditTruck';
import { CreateTrucks } from '../pages/CreateTrucks';
import { ListTrucks } from '../pages/ListTrucks';

import { ListPositions } from '../pages/ListPositions';
import { AddPosition } from '../pages/AddPosition';
import { EditPosition } from '../pages/EditPosition';
import { AssociatePosition } from '../pages/AssociatePosition';
import { ListAreas } from '../pages/ListAreas';
import { AddArea } from '../pages/AddArea';
import { EditArea } from '../pages/EditArea';
import { ListInvoicesStatus } from '../pages/ListInvoicesStatus';
import { AddInvoiceStatus } from '../pages/AddInvoiceStatus';
import { EditInvoiceStatus } from '../pages/EditInvoiceStatus';
import { Alerts } from '../pages/Alerts';
import { ListIncidents } from '../pages/ListIncidents';
import { AddIncident } from '../pages/AddIncident';
import { EditIncident } from '../pages/EditIncident';

import { ListBoxes } from '../pages/ListBoxes';
import { CreateBoxes } from '../pages/CreateBoxes';
import { EditBoxes } from '../pages/EditBoxes';
import { ListUsers } from '../pages/ListUsers';
import { CreateUsers } from '../pages/CreateUsers';
import { EditUsers } from '../pages/EditUsers';

import { ClearInvoices } from '../pages/ClearInvoices';

import { ListDeliveryReceipts } from '../pages/ListDeliveryReceipts';
import { AddDeliveryReceipt } from '../pages/AddDeliveryReceipt';
import { EditDeliveryReceipt } from '../pages/EditDeliveryReceipt';

import { RouteScripting } from '../pages/RouteScripting/RouteScripting';
import { Reloader } from '../pages/Reloader/Reloader';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route Component={Login} path="/" exact />
      <Route Component={Register} path="/cadastro" exact isPrivate />
      <Route
        Component={ForgotPassword}
        path="/recuperar-senha"
        exact
        isPrivate
      />

      <Route Component={Home} path="/home" exact isPrivate />
      <Route Component={Order} path="/pedido" exact isPrivate />
      <Route
        Component={ManualCreate}
        path="/pedido/cadastro-manual"
        exact
        isPrivate
      />

      <Route Component={ListTrucks} path="/caminhoes" exact isPrivate />
      <Route Component={EditTruck} path="/editar-caminhao" exact isPrivate />
      <Route
        Component={CreateTrucks}
        path="/cadastrar-caminhao"
        exact
        isPrivate
      />

      <Route
        Component={AddPosition}
        path="/adicionar-posicoes"
        exact
        isPrivate
      />
      <Route
        Component={AssociatePosition}
        path="/associar-posicoes"
        exact
        isPrivate
      />
      <Route
        Component={ListPositions}
        path="/todas-as-posicoes"
        exact
        isPrivate
      />

      <Route Component={CreateBoxes} path="/adicionar-caixas" exact isPrivate />
      <Route Component={EditBoxes} path="/editar-caixas" exact isPrivate />
      <Route Component={ListBoxes} path="/todas-as-caixas" exact isPrivate />
      <Route Component={ClearInvoices} path="/zezaobanco" exact isPrivate />
      <Route
        Component={ListInvoicesStatus}
        path="/status-notas-fiscais"
        exact
        isPrivate
      />
      <Route
        Component={AddInvoiceStatus}
        path="/adicionar-status-da-nota-fiscal"
        exact
        isPrivate
      />

      <Route Component={RouteScripting} path="/roteirizacao" exact isPrivate />

      <Route
        Component={EditInvoiceStatus}
        path="/editar-nota-fiscal"
        exact
        isPrivate
      />
      <Route Component={EditPosition} path="/editar-posicao" exact isPrivate />

      <Route Component={Alerts} path="/alertas" exact isPrivate />

      <Route Component={ListIncidents} path="/ocorrencias" exact isPrivate />
      <Route
        Component={AddIncident}
        path="/adicionar-ocorrencia"
        exact
        isPrivate
      />
      <Route
        Component={EditIncident}
        path="/editar-ocorrencia/:incidentID"
        exact
        isPrivate
      />

      <Route Component={ListAreas} path="/regioes" exact isPrivate />
      <Route Component={AddArea} path="/adicionar-regiao" exact isPrivate />
      <Route Component={EditArea} path="/editar-regiao" exact isPrivate />
      <Route Component={ListUsers} path="/listar-usuarios" exact isPrivate />
      <Route
        Component={CreateUsers}
        path="/adicionar-usuario"
        exact
        isPrivate
      />
      <Route Component={EditUsers} path="/editar-usuarios" exact isPrivate />
      {/* <Route Component={CreateRoles} path="/cadastrar-funcao" exact isPrivate /> */}
      <Route
        Component={ListDeliveryReceipts}
        path="/comprovantes"
        exact
        isPrivate
      />
      <Route
        Component={AddDeliveryReceipt}
        path="/adicionar-comprovante"
        exact
        isPrivate
      />
      <Route
        Component={EditDeliveryReceipt}
        path={'/editar-comprovante/:ReceiptId'}
        exact
        isPrivate
      />
      <Route Component={Reloader} path={'/reload'} exact isPrivate />
    </Switch>
  </BrowserRouter>
);
