'use client'
import Sidebar from "@/app/components/LeftSection";
import RightSection from "@/app/components/RightSection";
import SweetAlert from "./SweetAlert";

type LoadingProps = {
	title?: string;
	text?: string;
	icon: 'success' | 'error' | 'warning' | 'info' | 'question';
	confirmButtonText?: string;
	cancelButtonText?: string;
	confirmButtonColor?: string;
	cancelButtonColor?: string;
	showCancelButton?: boolean;
	showConfirmButton?: boolean;
	reverseButtons?: boolean;
	onConfirm?: () => void;
	onCancel?: () => void;
};

export default function Loading({
	title = "Loading...",
	text = "Please wait...",
	icon,
	confirmButtonText = "Ok",
	cancelButtonText = "Cancel",
	confirmButtonColor = "#d33",
	cancelButtonColor = "#3085d6",
	showCancelButton = false,
	showConfirmButton = false,
	reverseButtons = false,
	onConfirm,
	onCancel,
}: LoadingProps) {
	return (
		<div className={'container'}>
			<Sidebar active={'/expenses'} />
			<main>
				<SweetAlert
					title={title}
					text={text}
					icon={icon}
					confirmButtonText={confirmButtonText}
					cancelButtonText={cancelButtonText}
					confirmButtonColor={confirmButtonColor}
					cancelButtonColor={cancelButtonColor}
					showCancelButton={showCancelButton}
					showConfirmButton={showConfirmButton}
					reverseButtons={reverseButtons}
					onConfirm={onConfirm}
					onCancel={onCancel}
				/>
			</main>
			<RightSection />
		</div>
	)
}