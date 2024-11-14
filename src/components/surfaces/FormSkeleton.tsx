import { Skeleton, Stack } from "@mui/material"

export function FormSkeleton() {
	return (
		<Stack spacing={1}>
			<Skeleton />
			<Skeleton />
			<Skeleton />
		</Stack>
	)
}
