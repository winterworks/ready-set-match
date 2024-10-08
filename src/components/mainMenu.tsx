import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CollectionCreate from 'src/components/collectionCreate'
import { Link } from 'react-router-dom'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import AddIcon from '@mui/icons-material/Add'
import MenuIcon from '@mui/icons-material/Menu'
import HouseIcon from '@mui/icons-material/House'

interface Props {
  addCollectionDisabled?: boolean
}

export default function MainMenu({ addCollectionDisabled }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [createCollectionOpen, setCreateCollectionOpen] = React.useState(false)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const onCloseDialog = () => {
    setCreateCollectionOpen(false)
  }

  const onAddCollection = () => {
    closeMenu()
    setCreateCollectionOpen(true)
  }

  return (
    <>
      <Button
        id="menu-button"
        variant="outlined"
        size="large"
        endIcon={<MenuIcon />}
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        Menu
      </Button>
      <CollectionCreate
        isOpen={createCollectionOpen}
        closeDialog={onCloseDialog}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
        disableScrollLock={true}
      >
        <Link to="/">
          <MenuItem onClick={closeMenu}>
            <HouseIcon />
            Home
          </MenuItem>
        </Link>
        <MenuItem onClick={onAddCollection} disabled={addCollectionDisabled}>
          <AddIcon />
          Add Collection
        </MenuItem>
        <Link to="/data">
          <MenuItem onClick={closeMenu}>
            <ImportExportIcon />
            Import / Export
          </MenuItem>
        </Link>
      </Menu>
    </>
  )
}
