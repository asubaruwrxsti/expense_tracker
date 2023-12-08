import Sidebar from "@/app/components/Sidebar";
import RightSection from "@/app/components/RightSection";
import SweetAlert from "../components/SweetAlert";

export default function Loading() {
	return (
		<div className={'container'}>
			<Sidebar active={'/expenses'} />
			<main>
				<SweetAlert
					title={'Loading'}
					text={'Please wait...'}
					icon={'info'}
					confirmButtonText={'Ok'}
					cancelButtonText={'Cancel'}
					confirmButtonColor={'#d33'}
					cancelButtonColor={'#3085d6'}
					showCancelButton={false}
					showConfirmButton={false}
					reverseButtons={false}
				/>
			</main>
			<RightSection />
		</div>
	)
}