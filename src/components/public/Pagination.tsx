import { FC } from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PaginationProps } from '@/types/common';
import { useTheme } from '@mui/material/styles';

const CustomPagination: FC<PaginationProps> = ({ handleClick, page, number, totalNumber }) => {
  const paginationNum = Math.ceil(totalNumber / number);
  const theme = useTheme(); 

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    handleClick('page', value);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="center">
      <Pagination
        count={paginationNum}
        page={page}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
            sx={{ 
              color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main 
            }}
          />
        )}
      />
    </Stack>
  );
};

export default CustomPagination;
