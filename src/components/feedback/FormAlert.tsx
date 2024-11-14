import React from "react"
import { Alert, AlertTitle, Typography, Box } from "@mui/material"

type FormAlertProps = {
	visibleOn: boolean
	msg: { title?: string; body: string | string[] }
	type: "success" | "error"
	children?: React.ReactNode
}

function FormAlert({
	visibleOn,
	msg: { title, body },
	type,
	children,
}: FormAlertProps) {
	return (
		visibleOn && (
			<Box>
				<Alert color={type}>
					{title && <AlertTitle>{title}</AlertTitle>}
					{body}
				</Alert>
				<Box>{children}</Box>
			</Box>
		)
	)
}

export default FormAlert
