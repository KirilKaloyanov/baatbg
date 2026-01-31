import { ContactDTO } from "@/interfaces/ContactDTO";
import Image from "next/image";
import bullet from "@icons/icon_small_bw.png";

export default function ContactsCard({ contact, locale }: { contact: ContactDTO; locale: string }) {
  return (
    <>
      <div className="mb-8 flex w-full flex-col items-center justify-center gap-2 md:mb-0 md:min-h-[200px]">
        {contact.site && (
          <a
            className="block font-bold"
            href={
              /^https?:\/\//i.test(contact.site)
                ? contact.site
                : `https://${contact.site}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.site ? contact.site : ""}
          </a>
        )}
        <div className="flex w-full justify-around">
          <div className="flex-1">
            <div className="flex">
              <Image
                src={bullet}
                alt="Bullet icon"
                className="mr-2 hidden h-6 w-6 md:inline-block"
              />
              <p className="flex-1">
                <span className="block">{contact.community[locale]}</span>
                {contact.address && (
                  <span className="block">{contact.address[locale]}</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex">
              <Image
                src={bullet}
                alt="Bullet icon"
                className="mr-2 hidden h-6 w-6 md:inline-block"
              />
              <p>
                <span className="block">{contact.phone}</span>
                {contact.email && <span className="block">{contact.email}</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
