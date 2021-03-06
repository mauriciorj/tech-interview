import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import Header from '../../components/header';
import Footer from '../../components/footer';
import QuestionCard from '../../components/questionCard';
import BreadCrumbs from '../../components/breadCrumbs';
import QuestionsFilter from '../../components/questionsFilter';
import { translations } from '../../translations';
import { questionsDb } from '../../db/questionsDb';
import { getQuestions } from './actions';
import { makeSelectQuestions, makeSelectSetIsLoading } from './selector';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
  },
  footer: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
  },
  sessionMainDiv: {
    flexGrow: 1,
    textAlign: 'left',
    marginTop: '40px',
    marginBottom: '50px',
  },
  breadCrumbs: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '20px',
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '30px',
    marginLeft: '20px',
    marginBottom: '20px',
    width: '100%',
  },
  titleText: {
    paddingLeft: '15px',
  },
  filterArea: {
    display: 'flex',
  },
  filterAreaTitle: {
    marginTop: '10px',
    marginLeft: '30px',
    color: theme.palette.themeGrey.dark,
  },
  divider: {
    marginLeft: '20px',
  },
  cardSession: {
    marginTop: '40px',
    marginLeft: '20px',
    marginBottom: '20px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '20px',
      paddingRight: '10px',
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
  isLoading: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px'
  }
}));

export interface Props {
  map(
    arg0: (item: {
      answer: string;
      id: string;
      level: string;
      question: string;
    }) => JSX.Element
  ): React.ReactNode;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  sort(arg0: (a: QuestionType, b: QuestionType) => 1 | 0 | -1): any;
  data: {
    answer: string;
    id: string;
    level: string;
    order: number;
    question: string;
    tech: string;
  }[];
}

export interface QuestionType {
  answer: string;
  id: string;
  level: string;
  order: number;
  question: string;
  tech: string;
}

export interface QuestionsLevels {
  [key: string]: boolean;
}

const Questions: React.FC<Props> = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  let params = useParams();

  const [pagesNumber, setPagesNumber] = useState<number>(0);
  const [questionsPerPage, setQuestionsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentQuestions, setCurrentQuestions] = useState<
    Array<QuestionType> | []
  >([]);
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null);
  const [questionsLevels, setQuestionsLevels] = useState<QuestionsLevels>({
    basic: true,
    intermediate: true,
    advanced: true,
  });

  const {
    en: { og_url, techList },
  } = translations;

  const { id } = params;

  const questions = useSelector(makeSelectQuestions(id));
  const isLoading = useSelector(makeSelectSetIsLoading());

  let title = id;
  if (id) {
    const toString = id.toString();
    title = toString.charAt(0).toUpperCase() + toString.slice(1);
  }

  const breadCrumb = [
    {
      link: '/',
      title: 'Home',
    },
    {
      title: `Questions: ${id}`,
    },
  ];

  const getQuestionsFromDb = (id: string) => {
    let data;

    switch (id as string) {
      case 'javascript':
        data = questionsDb.en.javascript;
        break;
      case 'react':
        data = questionsDb.en.react;
        break;
    }

    return data;
  };

  const sortQuestions = (data: Props | QuestionType[]) => {
    const dataCopy = [...(data as any)];
    const orderQuestions = dataCopy.sort((a: QuestionType, b: QuestionType) =>
      a.order > b.order ? 1 : b.order > a.order ? -1 : 0
    );
    const lastItemIndex = currentPage * questionsPerPage;
    const firstItemIndex = lastItemIndex - questionsPerPage;
    const questionToShow = orderQuestions.slice(firstItemIndex, lastItemIndex);
    setCurrentQuestions(questionToShow);
    setTotalQuestions(orderQuestions.length);

    const calcQuestionsPerPage = Math.ceil(
      orderQuestions.length / questionsPerPage
    );
    setPagesNumber(calcQuestionsPerPage);
    if (calcQuestionsPerPage === 1) {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    dispatch(getQuestions({ tech: id }));
  }, [id]);

  useEffect(() => {
    if (id && questions) {
      sortQuestions(questions as unknown as Props);
    }
  }, [questions]);

  useEffect(() => {
    if (id && questions) {
      const getFilteredQuestions = questions.reduce(
        (acc: QuestionType[], finalQuestions: QuestionType) => {
          if (
            questionsLevels[finalQuestions.level] === true &&
            finalQuestions.level in questionsLevels
          ) {
            return [...acc, finalQuestions];
          } else {
            return acc;
          }
        },
        []
      );
      sortQuestions(getFilteredQuestions);
    }
  }, [currentPage, questionsPerPage, questionsLevels, params]);

  const onChangePagination = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const getDescription = techList?.find((item) => item.title === title);

  const levelFilterOnClick = (level: string) => {
    setQuestionsLevels((prevState) => ({
      ...prevState,
      [level]: !questionsLevels[level as any],
    }));
  };

  const handleChangeQuestionsPerPage = (questions: string) => {
    setQuestionsPerPage(parseInt(questions));
  };

  return (
    <div className={classes.root}>
      <Grid container item xs={12}>
        <Helmet>
          <title>{title} Questions</title>
          <meta name='description' content={getDescription?.description} />
          <meta property='og:url' content={`${og_url}questions/${id}`} />
        </Helmet>
        <Grid item xs={12} className={classes.header}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Header />
          </Grid>
        </Grid>
        <Grid container item xs={12} className={classes.sessionMainDiv}>
          <Grid item xs={12} sm={1} md={1}></Grid>
          <Grid item xs={11} sm={10}>
            <Box className={classes.breadCrumbs}>
              <BreadCrumbs breadCrumbInfo={breadCrumb} />
            </Box>
            <Box className={classes.title}>
              <img
                src={require(`../../assets/icons/${getDescription?.icon}`)}
                alt={getDescription?.title}
                width={50}
                height={50}
              />
              <Typography variant='h4' className={classes.titleText}>
                {title}
              </Typography>
            </Box>
            <Divider className={classes.divider} />
            <Grid item xs={12} className={classes.filterArea}>
              <Grid item xs={5} md={3} className={classes.filterAreaTitle}>
                <Typography>
                  <strong>Questions:</strong> {totalQuestions}
                </Typography>
              </Grid>
              <Grid item xs={7} md={9}>
                {questionsLevels && (
                  <QuestionsFilter
                    questionsLevels={questionsLevels}
                    questionsPerPage={questionsPerPage}
                    handleChangeQuestionsPerPage={handleChangeQuestionsPerPage}
                    onClick={levelFilterOnClick}
                    totalQuestions={totalQuestions}
                  />
                )}
              </Grid>
            </Grid>
            {isLoading && (
              <Grid item xs={12} className={classes.isLoading}>
                <CircularProgress size={50} />
              </Grid>
            )}
            <Grid item xs={12} md={12} className={classes.cardSession}>
              {currentQuestions?.map(
                (item: {
                  answer: string;
                  id: string;
                  level: string;
                  question: string;
                }) => (
                  <QuestionCard
                    answer={item.answer}
                    key={item.id}
                    id={item.id}
                    level={item.level}
                    question={item.question}
                  />
                )
              )}
            </Grid>
            <Grid item xs={12} md={12} className={classes.pagination}>
              <Pagination
                count={pagesNumber}
                shape='rounded'
                color='primary'
                onChange={(event, page) => onChangePagination(event, page)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.footer}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </div>
  ); // TODO: create a pre loading skeleton
};

export default Questions;
