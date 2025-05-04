import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button"

export default function Page() {
  const t = useTranslations("HomePage");
  return (
    <>
      <h1 className="text-3xl font-garamond">{t("title")}</h1>
      <Button variant="default">Button</Button>

      <div className="grid grid-cols-2">
        <div className="bg-background text-foreground">background - foreground</div>
        <div className="bg-foreground text-background">inversed</div>
        <div className="bg-primary text-primary-foreground">primary - primary-foreground</div>
        <div className="bg-primary-foreground text-primary">inversed</div>
        <div className="bg-secondary text-secondary-foreground">secondary - secondary-foreground</div>
        <div className="bg-secondary-foreground text-secondary">inversed</div>
        <div className="bg-card text-card-foreground">card - card-foreground</div>
        <div className="bg-card-foreground text-card">inversed</div>
        <div className="bg-popover text-popover-foreground">popover - popover-foreground</div>
        <div className="bg-popover-foreground text-popover">inversed</div>
        <div className="bg-muted text-muted-foreground">muted - muted-foreground</div>
        <div className="bg-muted-foreground text-muted">inversed</div>
        <div className="bg-accent text-accent-foreground">accent - accent-foreground</div>
        <div className="bg-accent-foreground text-accent">inversed</div>
        <div className="bg-sidebar text-sidebar-foreground">sidebar - sidebar-foreground</div>
        <div className="bg-sidebar-foreground text-sidebar">inversed</div>
        <div className="bg-sidebar-primary text-sidebar-primary-foreground">sidebar-primary - sidebar-primary-foreground</div>
        <div className="bg-sidebar-primary-foreground text-sidebar-primary">inversed</div>
        <div className="bg-sidebar-accent text-sidebar-accent-foreground">sidebar-accent - sidebar-accent-foreground</div>
        <div className="bg-sidebar-accent-foreground text-sidebar-accent">inversed</div>
      </div>


      <div className="bg-destructive">destructive</div>
      <div className="bg-border">border</div>
      <div className="bg-input">input</div>
      <div className="bg-ring">ring</div>
      <div className="bg-sidebar-border">sidebar-border</div>
      <div className="bg-sidebar-ring">sidebar-ring</div>
    </>
  );
}
