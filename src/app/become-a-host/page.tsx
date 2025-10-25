import { BahOptions } from "./_components/bah-options";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import StepLayout from "./_components/stepLayout";
import DraftsSection from "./_components/drafts-section";
import { DraftsErrorBoundary } from "./_components/drafts-error-boundary";

export const dynamic = "force-dynamic";


const Page = async () => {
	const user = await getCurrentUser();
	if (!user || !user.isHost) redirect("/explore");

	return (
		<StepLayout>
			<div className="w-full min-h-svh py-20 px-4">
				<div className="become-a-host-create-actual mt-2 h-full">
					<div className="become-a-host-create-actual-container w-full max-w-[620px] mx-auto">
						<h1 className="bah-wb-header text-[26px] md:text-[32px] font-semibold text-neutral-900 pt-10 md:pt-0 mb-5 md:mb-8">
							Welcome back <span className="capitalize">{`, ${user.firstName}`}</span>
						</h1>

						<DraftsErrorBoundary>
							<DraftsSection />
						</DraftsErrorBoundary>

						<BahOptions />
					</div>
				</div>
			</div>
		</StepLayout>
	);
};

export default Page;

// https://internal-gibbon-54.clerk.accounts.dev/v1/client/sessions/sess_325wg0FdW9kpjMw96Zvow81yeK7/tokens?__clerk_api_version=2025-04-10&_clerk_js_version=5.90.0&__clerk_db_jwt=dvb_31jg7g9nbSLKkmw7swe21cmEQUG
