import React from "react"
import { Alert, AlertTitle, Typography, Box } from "@mui/material"

type Message = { title?: string; body: string } | string

type FormAlertProps = {
	visibleOn: boolean
	msg: Message
	type: "success" | "error"
	children?: React.ReactNode
}
function isMessageObject(
	msg: Message,
): msg is { title?: string; body: string } {
	return typeof msg === "object" && "body" in msg
}

function FormAlert({ visibleOn, msg, type, children }: FormAlertProps) {
	const title = isMessageObject(msg) ? msg.title : null
	const body = isMessageObject(msg) ? msg.body : msg

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
