"use client";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Box, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

interface EmployeeFormData {
  name: string;
  age: string;
}

interface EmployeeApiData {
  name: string;
  age: number;
  department: string;
  position: string;
}

export function RegistrationEmployeeContainer() {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    defaultValues: {
      name: "",
      age: "",
    },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    setIsOpenSnackbar(true);
    setIsSubmitting(true);
    setIsSuccess(false);

    // フォームデータをAPI用のデータに変換
    const apiData: EmployeeApiData = {
      name: data.name,
      age: parseInt(data.age, 10),
    };

    try {
      // APIにデータを送信
      const response = await fetch("/api/employee/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      // レスポンスのチェック
      if (!response.ok) {
        const errorData = await response.json();
        console.error("登録に失敗しました:", errorData);
        setIsSuccess(false);
        setIsSubmitting(false);
      } else {
        reset({ name: "", age: "" }); // フォームをリセット
        setIsSuccess(true);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        display={"flex"}
        flexDirection="column"
        alignItems="flex-start"
        gap={1}
      >
        <Typography variant="h6">新規社員登録</Typography>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          p={2}
          gap={2}
        >
          <Avatar sx={{ width: 128, height: 128 }}>
            <PersonIcon sx={{ fontSize: 128 }} />{" "}
          </Avatar>
        </Box>
        <Typography variant="h6">名前：</Typography>
        <TextField
          {...register("name", { required: "名前は必須です" })}
          placeholder="名前を入力してください"
          fullWidth
        />
        {errors.name && (
          <Typography color="error">{errors.name.message}</Typography>
        )}
        <br />
        <Typography variant="h6">年齢：</Typography>
        <TextField
          {...register("age", {
            required: "年齢は必須です",
            pattern: {
              value: /^\d+$/,
              message: "年齢は数字で入力してください",
            },
          })}
          placeholder="年齢を入力してください"
          fullWidth
          type="number"
        />
        {errors.age && (
          <Typography color="error">{errors.age.message}</Typography>
        )}
        <br />
        <Typography variant="h6">部署：</Typography>
        <TextField
          {...register("department", { required: "部署は必須です" })}
          placeholder="部署を入力してください"
          fullWidth
        />
        {errors.department && (
          <Typography color="error">{errors.department.message}</Typography>
        )}
        <br />
        <Typography variant="h6">役職：</Typography>
        <TextField
          {...register("position", { required: "役職は必須です" })}
          placeholder="役職を入力してください"
          fullWidth
        />
        {errors.position && (
          <Typography color="error">{errors.position.message}</Typography>
        )}
      </Box>
      <button
        style={{
          backgroundColor:
            watch("name") &&
            watch("age") &&
            watch("department") &&
            watch("position")
              ? "rgb(60, 131, 212)"
              : "lightgray",
          color:
            watch("name") &&
            watch("age") &&
            watch("department") &&
            watch("position")
              ? "white"
              : "disabled",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "20px",
        }}
        OnClick={handleSubmit(onSubmit)}
        disabled={
          !watch("name") ||
          !watch("age") ||
          !watch("department") ||
          !watch("position")
        }
      >
        登録
      </button>
      <Snackbar
        open={isOpenSnackbar && isSubmitting}
        message="登録中..."
        autoHideDuration={2000}
        onClose={() => setIsSubmitting(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      <Snackbar
        open={isOpenSnackbar && !isSuccess}
        message="登録に失敗しました"
        autoHideDuration={2000}
        onClick={() => {
          setIsOpenSnackbar(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      <Snackbar
        open={isOpenSnackbar && isSuccess}
        message="登録が成功しました"
        autoHideDuration={2000}
        onClose={() => {
          setIsOpenSnackbar(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Paper>
  );
}
