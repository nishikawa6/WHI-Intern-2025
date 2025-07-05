"use client";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Box, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface EmployeeFormData {
  name: string;
  age: number;
}

export function RegistrationEmployeeContainer() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>();

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
          // value={inputName}
          // onChange={(e) => setInputName(e.target.value)}
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
          // value={inputAge}
          // onChange={(e) => setInputAge(e.target.value)}
          fullWidth
        />
        {errors.age && (
          <Typography color="error">{errors.age.message}</Typography>
        )}
      </Box>
      <button
        style={{
          backgroundColor:
            watch("name") && watch("age") ? "rgb(60, 131, 212)" : "lightgray",
          color: watch("name") && watch("age") ? "white" : "disabled",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "20px",
        }}
        onClick={handleSubmit((data: EmployeeFormData) => {
          console.log("登録データ:", data);
          // ここでAPIにデータを送信する処理を追加
          // 例: axios.post('/api/employees', data);
        })}
        disabled={!watch("name") || !watch("age")}
      >
        登録
      </button>
    </Paper>
  );
}
