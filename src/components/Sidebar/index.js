import { useState } from "react"
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Badge
} from "@material-ui/core"
import {
  HomeOutlined,
  CategoryOutlined,
  Storefront,
  PermIdentityOutlined,
  ExitToAppOutlined,
  VpnKeyOutlined,
  ShoppingCartOutlined,
  LocalMallOutlined,
  SecurityOutlined
} from "@material-ui/icons"
import { useStyles } from "./style"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { Search } from "../Search/"
import { userLogout } from "../../redux/slices/user"

export const Sidebar = (props) => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories.categories)
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()
  const user = useSelector((state) => state.users.user)

  const openDropDown = (e) => setAnchorEl(e.currentTarget)
  const closeDropDown = () => setAnchorEl(null)

  const CategoriesDropdown = (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      keepMounted
      onClose={closeDropDown}
    >
      {categories.map(({ _id, name }) => (
        <MenuItem
          component={NavLink}
          to={`/category/${_id}`}
          onClick={() => {
            closeDropDown()
            props.onClose()
          }}
          key={_id}
        >
          {name}
        </MenuItem>
      ))}
    </Menu>
  )

  return (
    <Drawer
      className={classes.root}
      anchor="left"
      open={props.open}
      onClose={props.onClose}
    >
      <Search className={classes.input} onSearch={() => props.onClose()} />

      <List>
        <ListItem
          button
          component={NavLink}
          exact
          to="/"
          onClick={props.onClose}
        >
          <ListItemIcon>
            <HomeOutlined />
          </ListItemIcon>
          <ListItemText className={classes.text} primary="Home" />
        </ListItem>

        <ListItem button component={NavLink} to="/shop" onClick={props.onClose}>
          <ListItemIcon>
            <Storefront />
          </ListItemIcon>
          <ListItemText className={classes.text} primary="Shop" />
        </ListItem>

        <ListItem button onClick={openDropDown}>
          <ListItemIcon>
            <CategoryOutlined />
          </ListItemIcon>
          <ListItemText className={classes.text} primary="Categories" />
        </ListItem>

        {user ? (
          <>
            <ListItem
              button
              component={NavLink}
              to="/profile"
              onClick={props.onClose}
            >
              <ListItemIcon>
                <PermIdentityOutlined />
              </ListItemIcon>
              <ListItemText className={classes.text} primary="Profile" />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to="/cart"
              onClick={props.onClose}
            >
              <ListItemIcon>
                <ShoppingCartOutlined />
              </ListItemIcon>
              <Badge badgeContent={props.cartItems} color="primary">
                <ListItemText className={classes.text} primary="Cart" />
              </Badge>
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to="/orders"
              onClick={props.onClose}
            >
              <ListItemIcon>
                <LocalMallOutlined />
              </ListItemIcon>
              <ListItemText className={classes.text} primary="Orders" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                dispatch(userLogout())
                props.onClose()
              }}
            >
              <ListItemIcon>
                <ExitToAppOutlined />
              </ListItemIcon>
              <ListItemText className={classes.text} primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              button
              component={NavLink}
              to="/login"
              onClick={props.onClose}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText className={classes.text} primary="Login" />
            </ListItem>
          </>
        )}

        <ListItem
          button
          component={NavLink}
          to="/admin"
          onClick={props.onClose}
        >
          <ListItemIcon>
            <SecurityOutlined />
          </ListItemIcon>
          <ListItemText className={classes.text} primary="Admin" />
        </ListItem>
      </List>

      {CategoriesDropdown}
    </Drawer>
  )
}
