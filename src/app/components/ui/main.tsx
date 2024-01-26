import {cn} from '@/lib/utils';

export interface MainProps {
  children: React.ReactNode;
  className?: string;
}

const Main = ({children, className}: MainProps) => {
  return (
    <main className={cn('w-full sm:w-[800px] px-4 sm:p-0', className)}>{children}</main>
  );
};

export default Main;
