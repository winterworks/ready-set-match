import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CollectionCreate from 'src/components/collectionCreate'
import { Link } from 'react-router-dom'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import MenuIcon from '@mui/icons-material/Menu'

interface Props {
  disabled?: boolean
}

export default function MainMenu({ disabled }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="menu-button"
        variant="outlined"
        size="large"
        endIcon={<MenuIcon />}
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ height: '100%' }}
        disabled={disabled}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
        disableScrollLock={true}
      >
        <CollectionCreate onClick={handleClose} />
        <MenuItem onClick={handleClose}>
          <Link to="/data">
            <ImportExportIcon />
            Import / Export
          </Link>
        </MenuItem>
      </Menu>
    </div>
  )
}
