import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/RingVolume';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InFoIcon from '@material-ui/icons/Info';
import HistoryIcon from '@material-ui/icons/History';
import Iconseduche from '@material-ui/icons/CallReceivedOutlined';
import Team from '@material-ui/icons/Person';

import { NavLink } from "react-router-dom";


export const MainListItems = ({ color }) => (

  <div>

    <NavLink style={{ color: color.colorHome }} to='/'>
      <ListItem button >
        <ListItemIcon color={color.colorHome} >
          <DashboardIcon htmlColor={color.colorHome} lightingColor={color.colorHome} />
        </ListItemIcon>
        <ListItemText primary="Quản lí style" />
      </ListItem>
    </NavLink>
    <NavLink style={{ color: color.colorManagerStoreMenber }} to='/managerMenber'>
      <ListItem button>
        <ListItemIcon>
          <Team htmlColor={color.colorManagerStoreMenber} lightingColor={color.colorManagerStoreMenber} />
        </ListItemIcon>
        <ListItemText primary="Quản lí thợ và địa chỉ" />
      </ListItem>
    </NavLink>

    <NavLink style={{ color: color.colorContact }} to='/managercalendarcut'>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon htmlColor={color.colorContact} lightingColor={color.colorContact} />
        </ListItemIcon>
        <ListItemText primary="Quản lí lịch cắt" />
      </ListItem>
    </NavLink>

    <NavLink style={{ color: color.colorBook }} to='/managerbook'>
      <ListItem button>
        <ListItemIcon>
          <Iconseduche htmlColor={color.colorBook} lightingColor={color.colorBook} />
        </ListItemIcon>
        <ListItemText primary="Quản lí khách đặt lịch" />
      </ListItem>
    </NavLink>


    <NavLink style={{ color: color.colorProduct }} to='/products'>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon htmlColor={color.colorProduct} lightingColor={color.colorProduct} />
        </ListItemIcon>
        <ListItemText primary="Sản phẩm" />
      </ListItem>
    </NavLink>

    <NavLink style={{ color: color.colorOder }} to='/oders'>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon htmlColor={color.colorOder} lightingColor={color.colorOder} />
        </ListItemIcon>
        <ListItemText primary="Sản phẩm khách đặt" />
      </ListItem>
    </NavLink>

    <NavLink style={{ color: color.colorSlider }} to='/service'>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon htmlColor={color.colorSlider} lightingColor={color.colorSlider} />
        </ListItemIcon>
        <ListItemText primary="Quản lí dịch vụ" />
      </ListItem>
    </NavLink>

    <NavLink style={{ color: color.colorHistory}} to='/history'>
      <ListItem button>
        <ListItemIcon>
          <HistoryIcon htmlColor={color.colorHistory} lightingColor={color.colorHistory} />
        </ListItemIcon>
        <ListItemText primary="Lịch sử khách cắt" />
      </ListItem>
    </NavLink>

    <NavLink style={{ color: color.colorInfo }} to='/notification'>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon htmlColor={color.colorInfo} lightingColor={color.colorInfo} />
        </ListItemIcon>
        <ListItemText primary="Thông báo" />
      </ListItem>
    </NavLink>
  </div>
);




export const UserList = ({ colorUser}) => (
  <div>
 
      <NavLink style={{ color: colorUser }}  to='/users'>
        <ListItem button>
          <ListItemIcon>
            <InFoIcon  htmlColor={colorUser} lightingColor={colorUser}/>
          </ListItemIcon>
          <ListItemText primary="Quản lí tài khoản" />
        </ListItem>
      </NavLink>

  </div>
)

