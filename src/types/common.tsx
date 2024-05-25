export interface PaginationProps {
    handleClick: (type: string, value: number) => void;
    page: number;
    number: number;
    totalNumber: number;
  }