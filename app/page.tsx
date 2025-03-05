import Link from "next/link";

export default function page(){
    return (
        <div className="flex gap-12 h-full justify-center items-center">
            <Link href="/auth" className="w-sm text-center rounded-lg border border-amber-50"> Authentication </Link>
            <Link href="/dashboard" className="w-sm text-center rounded-lg border border-amber-50"> Dashboard </Link>
        </div>
    )
}