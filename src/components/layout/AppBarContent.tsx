"use client"

import {
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material"
import { useState, MouseEvent } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import { Profile } from "@/db/schema"
import { usePathname } from "next/navigation"
import ModeToggle from "./ModeToggle"

const pages: string[] = []

type AppBarProps = {
	profile?: Profile | null
}

export const AppBarContent = ({ profile }: AppBarProps) => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const handleOpenNavMenu = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorElNav(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}
	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const pathname = usePathname()

	const isSignInPage = /^\/sign-in/.test(pathname)

	return (
		<Container>
			<Toolbar disableGutters>
				<Typography
					variant='h6'
					noWrap
					component='a'
					href='/'
					sx={{
						mr: 2,
						display: { xs: "none", md: "flex" },
						fontFamily: "monospace",
						fontWeight: 700,
						color: "inherit",
						textDecoration: "none",
					}}
				>
					LOGO
				</Typography>

				<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
					<IconButton
						size='large'
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						onClick={handleOpenNavMenu}
						color='inherit'
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id='menu-appbar'
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{ display: { xs: "block", md: "none" } }}
					>
						{pages.map((page) => (
							<MenuItem key={page} onClick={handleCloseNavMenu}>
								<Typography sx={{ textAlign: "center" }}>{page}</Typography>
							</MenuItem>
						))}
					</Menu>
				</Box>
				<Typography
					variant='h5'
					noWrap
					component='a'
					href='/'
					sx={{
						mr: 2,
						display: { xs: "flex", md: "none" },
						flexGrow: 1,
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".3rem",
						color: "inherit",
						textDecoration: "none",
					}}
				>
					LOGO
				</Typography>
				<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
					{pages.map((page) => (
						<Button
							key={page}
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							{page}
						</Button>
					))}
				</Box>

				{/* <ModeToggle /> */}
				<Box sx={{ flexGrow: 0 }}>
					{profile && (
						<Tooltip title='Åpne innstillinger'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									src={profile.image!}
									alt={profile.displayName || "Ingen bruker"}
								/>
							</IconButton>
						</Tooltip>
					)}

					{!profile && !isSignInPage && (
						<Button variant='outlined' href='/sign-in'>
							Logg inn
						</Button>
					)}
					<Menu
						sx={{ mt: "45px" }}
						id='menu-appbar'
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						<MenuItem component='a' href='/api/signout'>
							Logg ut
						</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</Container>
	)
}
